# DNS Configuration Guide for GitHub Pages (Cloudflare)

This document explains how to point a custom domain that you manage in **Cloudflare** to a site hosted on **GitHub Pages** (e.g., `https://davethegrwothdev.github.io/ArtVendoor/`).

## Prerequisites

1. A GitHub repository with **GitHub Pages** enabled and serving from the `main` branch root folder.
2. A custom domain (e.g., `example.com`) that you control in Cloudflare.
3. Access to the repository to add a `CNAME` file.

## Step‑by‑step instructions

### 1. Add a `CNAME` file to the repository

Create a file named `CNAME` in the **root** of the repository (same level as `index.html`). The file should contain **only** your custom domain, for example:

```
example.com
```

Commit and push the file to the `main` branch:

```bash
git add CNAME
git commit -m "Add CNAME for custom domain"
git push origin main
```

> The `CNAME` file tells GitHub Pages which domain to serve the site on. See the official docs: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

### 2. Configure DNS records in Cloudflare

#### a. Apex (root) domain – `example.com`

Add **four A records** pointing to GitHub Pages' IPv4 addresses:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A    | @    | 185.199.108.153 | Auto |
| A    | @    | 185.199.109.153 | Auto |
| A    | @    | 185.199.110.153 | Auto |
| A    | @    | 185.199.111.153 | Auto |

If you also want IPv6 support, add **four AAAA records**:

| Type  | Name | Value               | TTL |
|-------|------|---------------------|-----|
| AAAA  | @    | 2606:50c0:8000::153 | Auto |
| AAAA  | @    | 2606:50c0:8001::153 | Auto |
| AAAA  | @    | 2606:50c0:8002::153 | Auto |
| AAAA  | @    | 2606:50c0:8003::153 | Auto |

#### b. Sub‑domain – `www.example.com` (or any other sub‑domain you prefer)

Add a **CNAME record** that points to your GitHub Pages domain (`davethegrwothdev.github.io`):

| Type  | Name | Value                         | TTL |
|-------|------|-------------------------------|-----|
| CNAME | www  | davethegrwothdev.github.io    | Auto |

> **Important:** Do **not** enable Cloudflare's orange‑cloud proxy (the **proxy status** should be **DNS only**). The proxy interferes with the SSL handshake that GitHub Pages provides.

### 3. Verify the setup

1. Wait a few minutes for DNS propagation (Cloudflare is usually fast).
2. Visit `https://example.com` (or `https://www.example.com`). You should see your GitHub Pages site.
3. Ensure the lock icon appears in the browser, indicating a valid HTTPS certificate issued by GitHub.

If you encounter a 404 or SSL error, double‑check:

* The `CNAME` file is present at the repository root and contains the exact domain.
* DNS records are set to **DNS only** (no orange cloud).
* The A/AAAA records match the IPs listed above (GitHub may update them; you can re‑run `dig +short davethegrwothdev.github.io` to confirm).

### 4. Optional – Enforce HTTPS

GitHub Pages automatically provides HTTPS for custom domains, but you can enforce it by enabling **“Enforce HTTPS”** in the repository’s **Pages** settings.

---

**References**

* GitHub Pages IP addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
* IPv6 addresses: `2606:50c0:8000::153` … `2606:50c0:8003::153`
* Cloudflare DNS documentation: <https://developers.cloudflare.com/dns>

