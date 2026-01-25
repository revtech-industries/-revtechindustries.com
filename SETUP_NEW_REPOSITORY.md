# Setup: Company Website (revtechindustries.io)

This project is the **REVTECH INDUSTRIES** company website, served at **https://revtechindustries.io**.

- **Portfolio** (separate): https://revtech-industries.github.io/
- **This site**: https://revtechindustries.io (Cloudflare + GitHub Pages)

---

## Quick start

Follow **GETTING_STARTED.md** in this folder for the full checklist:

1. **Portfolio** – ensure revtech-industries.github.io is live with no custom domain.
2. **Website** – create GitHub repo, push this folder (with `CNAME` = `revtechindustries.io`), enable Pages + custom domain, then set Cloudflare DNS.

---

## Repo and domain

- **CNAME:** `revtechindustries.io` (apex, no www) — already set in this project.
- **GitHub:** Create a repo (e.g. `revtechindustries-website`), push these files, and in **Settings → Pages** set:
  - Deploy from **main** (or **master**), **/ (root)**
  - **Custom domain:** `revtechindustries.io`
- **Cloudflare:** CNAME **@** → `revtech-industries.github.io` (or your `*.github.io` host). Optionally **www** CNAME + redirect to apex.

See **GETTING_STARTED.md** and, in the portfolio repo, **GITHUB_PAGES_CUSTOM_DOMAIN_SETUP.md** for details.
