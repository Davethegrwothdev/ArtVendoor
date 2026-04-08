# Artvendoor - Complete Deployment & Preview Guide

## Part 1: Share a Preview Link from VS Code (Before Deployment)

### Option A: Using Live Server Extension (Local Preview)
1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html` and select **"Open with Live Server"**
3. This opens `http://127.0.0.1:5500` in your browser
4. **Limitation**: Only works on your local machine

### Option B: Using GitHub + Cloudflare Pages Preview (Recommended for Sharing)

This gives you a shareable URL that anyone can access:

#### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New"** to create a new repository
3. Name it: `artvendoor-landing`
4. Set to **Public** (free) or **Private** (free)
5. Click **"Create repository"**

#### Step 2: Push Your Files to GitHub
Open your terminal in the ArtVendor project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Artvendoor landing page"

# Create main branch
git branch -M main

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/artvendoor-landing.git

# Push to GitHub
git push -u origin main
```

#### Step 3: Connect to Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in
2. Click **"Workers & Pages"** in the left sidebar
3. Click **"Create Application"** → **"Pages"** tab
4. Click **"Connect to Git"**
5. Authorize Cloudflare to access your GitHub account
6. Select your `artvendoor-landing` repository
7. Configure build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: (leave empty)
8. Click **"Save and Deploy"**

#### Step 4: Get Your Preview Link
After deployment completes (~30 seconds), Cloudflare will give you a URL like:
```
https://artvendoor-landing.pages.dev
```

**Share this link with anyone for feedback!**

---

## Part 2: Connect Your Namecheap Domain (DNS on Cloudflare)

Since your domain's DNS is already managed by Cloudflare, this is straightforward:

### Step 1: Add Custom Domain in Cloudflare Pages
1. In your Cloudflare Pages project, go to **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `artvendoor.com` or `www.artvendoor.com`)
4. Click **"Continue"**

### Step 2: Cloudflare Auto-Configures DNS
Since your DNS is already on Cloudflare:
- Cloudflare will **automatically create** the required DNS records
- You'll see a confirmation that the domain is verified
- No manual DNS changes needed!

### Step 3: Choose Your Domain Setup
You have two options:

#### Option A: Root Domain (artvendoor.com)
- Enter: `artvendoor.com`
- Cloudflare creates an ALIAS/ANAME record automatically

#### Option B: WWW Subdomain (www.artvendoor.com)
- Enter: `www.artvendoor.com`
- Cloudflare creates a CNAME record automatically

#### Option C: Both (Recommended)
- Set up both `artvendoor.com` and `www.artvendoor.com`
- Cloudflare will redirect one to the other

### Step 4: Wait for SSL Certificate
- Cloudflare automatically provisions a free SSL certificate
- This takes 5-15 minutes
- Your site will be available at `https://yourdomain.com`

### Step 5: Verify It's Working
1. Visit your domain in a browser
2. You should see your Artvendoor landing page
3. Check that HTTPS is working (green lock icon)

---

## Part 3: Update Your Site (After Initial Deploy)

Whenever you make changes to your landing page:

```bash
# Make your changes, then:
git add .
git commit -m "Update: describe your changes"
git push
```

Cloudflare Pages will **automatically redeploy** within ~30 seconds.

---

## Part 4: Email Collection Setup (Optional)

To actually collect emails from the waitlist form:

### Option A: Formspree (Free, Easiest)
1. Go to [formspree.io](https://formspree.io) and sign up
2. Create a new form
3. Replace the form action in `index.html`:
```html
<form class="email-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option B: Mailchimp (Free up to 500 contacts)
1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Create an audience/list
3. Create an embedded form
4. Replace the form in `index.html` with Mailchimp's embed code

### Option C: ConvertKit (Free up to 1,000 subscribers)
1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a landing page/form
3. Use their API or embed code

---

## Quick Reference: All URLs

| Purpose | URL Format |
|---------|-----------|
| Local preview | `http://127.0.0.1:5500` |
| Cloudflare Pages preview | `https://artvendoor-landing.pages.dev` |
| Your custom domain | `https://artvendoor.com` |
| GitHub repository | `https://github.com/YOUR_USERNAME/artvendoor-landing` |

---

## Troubleshooting

### "DNS resolution failed"
- Wait 5-15 minutes for DNS propagation
- Check Cloudflare Pages dashboard for status

### "SSL certificate pending"
- Wait up to 15 minutes for certificate provisioning
- Cloudflare handles this automatically

### "Page not found"
- Ensure your files are in the repository root (not in a subfolder)
- Check that `index.html` exists at the top level

### Form not submitting
- Check browser console for errors
- Verify your email service endpoint is correct

