# 🚀 Deployment Guide — "The Next 18"

## Complete setup instructions to host this app on a live URL.
Follow any ONE of the options below.

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Option A: Vercel (Recommended)](#2-option-a-vercel--recommended)
3. [Option B: Netlify](#3-option-b-netlify)
4. [Option C: GitHub Pages](#4-option-c-github-pages)
5. [Option D: Cloudflare Pages](#5-option-d-cloudflare-pages)
6. [Option E: Custom VPS (DigitalOcean/AWS/Linode)](#6-option-e-custom-vps)
7. [Custom Domain Setup](#7-custom-domain-setup)
8. [Environment Variables & Config](#8-environment-variables--config)
9. [Updating the App](#9-updating-the-app)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

You need these installed on your machine:

```bash
# Node.js (v18 or higher) — check with:
node --version

# npm (comes with Node) — check with:
npm --version

# Git — check with:
git --version
```

If you don't have Node.js: Download from https://nodejs.org (LTS version)

---

## 2. Option A: Vercel (Recommended)

### Why Vercel?
- Free tier is generous
- Zero-config for Vite projects
- Automatic HTTPS
- Global CDN
- Auto-deploys from GitHub

### Steps:

#### Step 1: Create a GitHub repository
```bash
# Navigate to your project folder
cd /path/to/your/project

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - The Next 18 app"

# Create a .gitignore file first
echo "node_modules
dist
.DS_Store
*.local" > .gitignore

git add .gitignore
git commit -m "Add gitignore"
```

Go to https://github.com/new and create a new repository (e.g., "the-next-18"), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/the-next-18.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com and sign up/log in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `the-next-18` repository
4. Vercel will auto-detect Vite — keep defaults:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**
6. Wait ~60 seconds. Your app is live! 🎉

#### Your URL will be: `https://the-next-18.vercel.app`

#### Step 3: (Optional) Set custom domain
- In Vercel dashboard → Settings → Domains
- Add your domain and follow DNS instructions

---

## 3. Option B: Netlify

### Steps:

#### Method 1: Drag & Drop (Fastest)
```bash
# Build the project
npm run build
```
1. Go to https://app.netlify.com
2. Sign up / Log in
3. Drag the `dist` folder onto the Netlify dashboard
4. Done! You get a live URL instantly.

#### Method 2: Git-based (Auto-deploy)
1. Push code to GitHub (same as Vercel Step 1)
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
3. Connect GitHub → Select your repo
4. Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click "Deploy site"
6. URL: `https://random-name.netlify.app`
7. Rename in Site settings → General → Site name

---

## 4. Option C: GitHub Pages

### Steps:
```bash
# Install gh-pages package
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# For Vite, first update vite.config.ts base:
# base: '/the-next-18/'
```

Create `vite.config.ts` update:
```ts
export default defineConfig({
  base: '/the-next-18/', // Your repo name
  plugins: [react()],
})
```

```bash
# Build and deploy
npm run build
npx gh-pages -d dist
```

Your site: `https://YOUR_USERNAME.github.io/the-next-18/`

---

## 5. Option D: Cloudflare Pages

1. Go to https://dash.cloudflare.com → Workers & Pages
2. Create a project → Connect to Git
3. Select your GitHub repo
4. Settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Build output**: `dist`
5. Deploy
6. URL: `https://the-next-18.pages.dev`

---

## 6. Option E: Custom VPS

### For DigitalOcean / Linode / AWS EC2:

```bash
# SSH into your server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt update
sudo apt install nginx

# Clone your repo
git clone https://github.com/YOUR_USERNAME/the-next-18.git
cd the-next-18

# Install and build
npm install
npm run build

# Configure Nginx to serve the dist folder
sudo nano /etc/nginx/sites-available/the-next-18
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /root/the-next-18/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/the-next-18 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Add SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

## 7. Custom Domain Setup

### If using Vercel/Netlify/Cloudflare:
1. Buy a domain from:
   - Namecheap (https://namecheap.com)
   - Google Domains (https://domains.google)
   - Cloudflare Registrar (cheapest)

2. In your hosting platform, add the custom domain

3. Add DNS records at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: your-hosting-url

   Type: A (or CNAME)
   Name: @
   Value: your-hosting-ip (or URL)
   ```

4. Wait 5-30 minutes for DNS propagation

### Suggested domain names:
- `thenext18.com`
- `edwinandmindy.com`
- `18yearsof.us`
- `anniversary-course.com`

---

## 8. Environment Variables & Config

Currently this app has no backend or API keys — everything runs client-side.

If you add features later (auth, database, etc.), create a `.env` file:
```env
VITE_APP_NAME=The Next 18
VITE_API_URL=https://your-api.com
```

Add to `.gitignore`:
```
.env
.env.local
```

---

## 9. Updating the App

### If using Vercel/Netlify/Cloudflare with Git:
```bash
# Make your changes to the code
# Then:
git add .
git commit -m "Description of changes"
git push

# The site auto-rebuilds and deploys in ~60 seconds
```

### If using drag-and-drop (Netlify manual):
```bash
npm run build
# Drag the new `dist` folder to Netlify
```

### If using VPS:
```bash
cd the-next-18
git pull
npm install   # if you added new packages
npm run build
# Nginx auto-serves the new dist
```

---

## 10. Troubleshooting

### "Page not found" on refresh (SPA routing)
This is handled by the singlefile Vite plugin. If deploying separately, add a `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Build fails
```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styles look wrong
Make sure Tailwind CSS is building properly:
```bash
npm run build
# Check dist/index.html has inline styles
```

### "Module not found" errors
```bash
npm install   # reinstall all dependencies
```

---

## Quick Reference — File Structure

```
the-next-18/
├── docs/                          # Documentation (this file)
├── public/                        # Static assets (images, etc.)
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx        # Landing hero with animations
│   │   ├── CourseTimeline.tsx      # 14-day course timeline
│   │   └── Sections.tsx           # All 5 interactive sections
│   ├── data/
│   │   └── courseData.ts          # All course content data
│   ├── App.tsx                     # Main app with navigation
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Custom styles & animations
│   └── utils/
│       └── cn.ts                   # Utility
├── index.html                      # HTML shell
├── package.json                    # Dependencies
├── vite.config.ts                  # Vite configuration
└── tsconfig.json                   # TypeScript config
```

---

## Tech Stack
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| vite-plugin-singlefile | Single HTML output |

---

**Minimum cost to run live: $0 (free tier on any platform above)**
