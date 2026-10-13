<?php
// Receives the contact form (JSON) and emails it to the team. Runs on the cPanel host with PHP mail().
// Checks: POST only, size limit, required fields, valid email, no header injection, 5 messages per hour per IP.

declare(strict_types=1);

const TO = 'hello@etdledger.com';
const FROM = 'hello@etdledger.com';
const MAX_PER_HOUR = 5;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

function cut(string $s, int $max): string
{
    return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max);
}

// Single-line fields: strip line breaks so nothing can be injected into mail headers.
function line($v, int $max): string
{
    return trim(cut(preg_replace('/[\r\n\t\0]+/', ' ', is_string($v) ? $v : ''), $max));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode($raw === false ? '' : $raw, true);
if (!is_array($in)) {
    reply(400, ['error' => 'invalid_request']);
}

$name = line($in['name'] ?? '', 120);
$email = line($in['email'] ?? '', 200);
$company = line($in['company'] ?? '', 160);
$role = line($in['role'] ?? '', 120);
$interest = line($in['interest'] ?? '', 200);
$size = line($in['size'] ?? '', 120);
$message = trim(cut(str_replace("\0", '', is_string($in['message'] ?? null) ? $in['message'] : ''), 5000));

if ($name === '' || $company === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, ['error' => 'invalid_fields']);
}

// Rate limit per IP, kept in a small file in the temp directory.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/etdledger-contact-' . hash('sha256', $ip);
$now = time();
$hits = json_decode((string) @file_get_contents($file), true);
$hits = array_values(array_filter(is_array($hits) ? $hits : [], fn ($t) => is_int($t) && $t > $now - 3600));
if (count($hits) >= MAX_PER_HOUR) {
    reply(429, ['error' => 'too_many_requests']);
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

$subject = '=?UTF-8?B?' . base64_encode('Website enquiry: ' . $company) . '?=';
$body = implode("\n", [
    "Name: $name",
    "Email: $email",
    "Company: $company",
    "Role: " . ($role !== '' ? $role : '-'),
    "Interested in: " . ($interest !== '' ? $interest : '-'),
    "Infrastructure: " . ($size !== '' ? $size : '-'),
    '',
    $message,
    '',
    '-- Sent from the contact form on etdledger.com',
]);
$headers = implode("\r\n", [
    'From: ETDLedger website <' . FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(TO, $subject, $body, $headers)) {
    reply(500, ['error' => 'send_failed']);
}
reply(200, ['ok' => true]);
