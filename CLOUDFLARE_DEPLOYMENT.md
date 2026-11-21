# Cloudflare Pages Deployment Guide: ShishuDrishti (Assam Congenital Sentinel)

**Project Name:** `shishu-drishti`  
**Problem Statement:** NESFIC-D-27 (Stream 1 — Government Track: Health Sector)  
**Target Domain:** `https://shishu-drishti.pages.dev/`  
**GitHub Repository:** `https://github.com/RonHatibaruah/shishu-drishti-assam`  

---

## 🚀 Deployment Options

### Option 1: Direct GitHub Integration via Cloudflare Dashboard (Recommended)

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation menu, navigate to **Workers & Pages** ➔ **Create application** ➔ select the **Pages** tab.
3. Click **Connect to Git** and choose **GitHub**.
4. Select the repository: `RonHatibaruah/shishu-drishti-assam`.
5. In **Set up builds and deployments**, configure:
   - **Project name:** `shishu-drishti`
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave blank / default)*
6. In **Environment variables (advanced)**, configure:
   - `NODE_VERSION` = `20.18.0`
7. Click **Save and Deploy**. Cloudflare Pages will build and deploy your application to `https://shishu-drishti.pages.dev/`. Every future push to `main` will automatically trigger a zero-downtime deployment!

---

## Option 2: Command Line Deployment via Wrangler CLI

You can also deploy directly from your local terminal:

```bash
# 1. Build production assets
npm run build

# 2. Deploy directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=shishu-drishti
```

If prompted to log in:
```bash
npx wrangler login
```

Or deploy non-interactively using your Cloudflare API token:
```bash
CLOUDFLARE_API_TOKEN="your_token" CLOUDFLARE_ACCOUNT_ID="your_account_id" npx wrangler pages deploy dist --project-name=shishu-drishti
```
