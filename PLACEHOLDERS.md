# Placeholders to replace before relying on the site

Everything below was written without confirmed information. Replace or confirm each item.

## Contact details — `src/lib/site.ts`
- `hello@etdledger.com` is a placeholder email. Used in the footer, contact, company, docs, security and legal pages.
- No street address or phone number yet. Add them to `site.ts` and the footer.

## Product screenshots — `src/components/ui/*Mock.astro`
- The dashboard, deploy, data, network, observe and audit-log views are HTML illustrations with example data, captioned "Illustration of the InfraLedger dashboard". Replace with real screenshots.

## Quickstart and docs — `src/pages/index.astro`, `src/pages/docs/index.astro`
- `git clone <your-access-url> infraledger` and `docker compose up -d` assume access is delivered as a Git repository started with Docker Compose. Confirm the real install steps.
- Requirements (64-bit Linux, Docker Engine and Compose plugin, ports 80/443, a domain) and the dashboard flow (create account, organization, project) should be checked against the real product.
- `app.localhost` for local evaluation comes from the platform overview.

## Supported platforms — `src/pages/index.astro`, `src/pages/docs/index.astro`
- The "Runs on the infrastructure you already have" logos (Ubuntu, Debian, Red Hat, Rocky Linux) and the Docs requirement logos assume any 64-bit Linux with Docker works. Confirm which distributions you support.
- Logos come from Simple Icons (CC0) and are shown in one color, as nominative references to the technologies InfraLedger runs on.

## Pricing — `src/pages/pricing.astro`
- Editions (Community, Business, Enterprise), their contents and "Pricing on request" are placeholders.
- FAQ answers on evaluation, support levels and changing editions are assumptions.
- Home FAQ answers on licensing and support are assumptions.

## Security — `src/pages/security.astro`
- "ETDLedger staff have no access unless you grant it" and the vulnerability-reporting address should be confirmed as company policy.

## Audiences — `src/pages/index.astro`
- "Who it's for" (banks, telecom, public sector, software teams) describes target markets, not customers.

## Legal — `src/pages/legal/*`
- Privacy policy and terms are drafts. Have them reviewed by a lawyer, especially the reference to Law No. 18-07, retention and governing law.
- If a form-processing service is configured (`PUBLIC_FORM_ENDPOINT`), name it in the privacy policy.

## Not on the site yet
- Team section on the Company page.
- Customer logos or case studies.
- French version.
