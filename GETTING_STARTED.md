# Get Everything Up and Running

Checklist to get your **portfolio** and **website** live.

---

## Part 1: Portfolio → https://revtech-industries.github.io/

Your portfolio stays on the default GitHub Pages URL. **No CNAME.**

| # | Step | Done |
|---|------|------|
| 1 | Open the **revtech-industries.github.io** repo on GitHub | ☐ |
| 2 | **Settings → Pages** → Source: **Deploy from branch** → `main` (or `master`), folder **/ (root)** | ☐ |
| 3 | Ensure **Custom domain** is **empty** (or remove it). Do **not** add a CNAME file. | ☐ |
| 4 | Push your latest portfolio from `portfolio/revtech-industries.github.io/` to GitHub | ☐ |
| 5 | Visit **https://revtech-industries.github.io/** to confirm it loads | ☐ |

---

## Part 2: Website → https://revtechindustries.io

This repo (`revtech-industries-website`) becomes the live site at **revtechindustries.io**.  
`CNAME` is already set to `revtechindustries.io`.

### 2a. Create the GitHub repo (if it doesn’t exist)

| # | Step | Done |
|---|------|------|
| 1 | Go to **https://github.com/new** | ☐ |
| 2 | **Repository name:** `revtechindustries-website` or `revtech-website` | ☐ |
| 3 | **Description:** `REVTECH INDUSTRIES Company Website` | ☐ |
| 4 | **Public** | ☐ |
| 5 | Create (with or without README; you’ll push your files next) | ☐ |

### 2b. Push this folder to the new repo

From the `revtech-industries-website` folder:

```powershell
cd c:\Users\aerom\artemis_reflect\portfolio\revtech-industries-website

git init
git add .
git commit -m "Initial commit: REVTECH website for revtechindustries.io"
git branch -M main
git remote add origin https://github.com/revtech-industries/revtechindustries-website.git
git push -u origin main
```

- Replace **revtech-industries/revtechindustries-website** with your `owner/repo` if different.
- If this folder is already a git repo: skip `git init`, and use `git remote add origin ...` only if you don’t have a remote yet. Then `git push -u origin main`.

### 2c. Turn on GitHub Pages

| # | Step | Done |
|---|------|------|
| 1 | In the **website** repo: **Settings → Pages** | ☐ |
| 2 | **Source:** Deploy from branch → **main** (or **master**), folder **/ (root)** | ☐ |
| 3 | **Custom domain:** type `revtechindustries.io` → **Save** | ☐ |
| 4 | Wait until it shows **“DNS check successful”** (or similar). Then enable **Enforce HTTPS** | ☐ |

### 2d. Cloudflare DNS (revtechindustries.io)

You own **revtechindustries.io** via Cloudflare. In **Cloudflare Dashboard → revtechindustries.io → DNS**:

**Apex (revtechindustries.io)**

Choose one:

- **Option A – CNAME (simplest with Cloudflare):**
  - Type: **CNAME** | Name: **@** | Target: **`revtech-industries.github.io`**  
    (Use `your-username.github.io` if the repo is under your user, not the org.)
  - Proxy: **Proxied** (orange) or **DNS only** (grey). If Proxied: **SSL/TLS** = **Full** or **Full (strict)**.

- **Option B – A records:**
  - Add 4 A records for **@**:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

**www (optional)**  
- CNAME **www** → **`revtech-industries.github.io`**  
- **Rules → Redirect Rules**: `www.revtechindustries.io` → **https://revtechindustries.io** (301)

### 2e. Verify

| # | Step | Done |
|---|------|------|
| 1 | Wait 5–30 min (up to 24–48 h in some cases). Check [whatsmydns.net](https://www.whatsmydns.net) for `revtechindustries.io` | ☐ |
| 2 | Open **https://revtechindustries.io** | ☐ |
| 3 | In GitHub **Settings → Pages**, enable **Enforce HTTPS** when the domain is verified | ☐ |

---

## Summary

| Site | Repo | URL |
|------|------|-----|
| **Portfolio** | revtech-industries.github.io | https://revtech-industries.github.io/ |
| **Website** | revtechindustries-website (or your repo name) | https://revtechindustries.io |

---

## If something doesn’t work

- **Portfolio 404:** Branch/folder in Settings → Pages must match where `index.html` lives.  
- **revtechindustries.io not loading:**  
  - CNAME in repo must be exactly `revtechindustries.io` (no `www` if you use apex).  
  - Cloudflare DNS: CNAME or A records must point to the correct `*.github.io` host.  
  - GitHub **Custom domain** must be exactly `revtechindustries.io`.  
- **HTTPS / certificate:** Turn on **Enforce HTTPS** only after the custom domain is verified in GitHub.

More detail: **GITHUB_PAGES_CUSTOM_DOMAIN_SETUP.md** in the portfolio repo.
