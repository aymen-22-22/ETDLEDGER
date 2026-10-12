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

## Pricing
- There is no pricing page; /pricing redirects to /contact. The contact page says InfraLedger is quoted after a first call. Confirm this wording.

## Security — `src/pages/security.astro`
- "ETDLedger staff have no access unless you grant it" and the vulnerability-reporting address should be confirmed as company policy.

## Services — `src/pages/services.astro`
- Odoo is a new service line. Its offerings (implementation, custom modules, migration, hosting on InfraLedger, training, support) were written from the request and need confirming.
- The security tool logos (OWASP, Kali Linux, Trivy, Elastic Stack) and the "Systems we work with" strip imply your team uses these. Keep only the ones you actually work with.
- The dashboard, deploy and detections views are illustrations with sample data, not client data. Performance figures were removed on purpose.
- Services are grouped into three practices (Platform, Security, Enterprise systems). Confirm the grouping and the items listed for each.

## Cyber labs — `src/pages/labs.astro`
- Lab types, delivery steps, safety commitments (expiring VPN credentials, teardown after the engagement) and the technology logos describe a planned offering. Confirm each before relying on the page.
- The lab network view is an illustration.

## Audiences — `src/pages/index.astro`
- "Who it's for" (banks, telecom, public sector, software teams) describes target markets, not customers.

## Legal — `src/pages/legal/*`
- Privacy policy and terms are drafts. Have them reviewed by a lawyer, especially the reference to Law No. 18-07, retention and governing law.
- If a form-processing service is configured (`PUBLIC_FORM_ENDPOINT`), name it in the privacy policy.

## Not on the site yet
- Team section on the Company page.
- Customer logos or case studies.
- French version.

## Diagrams and photos
- The infrastructure topologies (product page), network security topologies (security page), and the SAP, Oracle failover and security pipeline animations (services page) are reference patterns, not client architectures. Confirm the components shown match how you deliver.
- The product page "Templates" logos (WordPress, Odoo, Nextcloud, Gitea, GitLab, Grafana, Metabase, Keycloak, Mattermost, MinIO, Ghost, Moodle) must be confirmed as available InfraLedger templates.
- The security tools and enterprise systems logos on the services page should list only tools your team actually uses.
- Photo slots on the services and company pages are empty until files are added to `public/photos/` (file list below).

### Photo files (put them in public/photos/)
Drop these files here and they appear on the site automatically. Until a file exists, its slot is hidden.
Photos are shown in grayscale to match the monochrome design. Use JPGs around 1600 px wide.

| File | Page | Suggested subject |
| --- | --- | --- |
| services-datacenter.jpg | Services | Server racks in a data center |
| services-security.jpg | Services | Engineers at monitoring screens |
| services-team.jpg | Services | Engineers working together |
| company-office.jpg | Company | Your office or team (wide, 21:9) |

Stock sources with free commercial licenses: unsplash.com, pexels.com. Replace them with your own photos when you can.

## Product themes
- Brand colors come from the supplied marks: ETDLedger vermilion (#FF5A36 dark, #E5482A light) and InfraLedger petrol (#3FB6C4).
- SAP (#0070F2), Oracle (#C74634) and Odoo (#714B67 with teal #017E84) pages use those companies' brand colors. Each page has a note that ETDLedger is an independent provider. If ETDLedger becomes an official partner, update the notes.
- The Oracle mark in the page header is plain text, not Oracle's logo.
