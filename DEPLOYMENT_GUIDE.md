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

## Part 4: Push Changes to GitHub (Two Methods)

### Method A: Using VS Code UI (Beginner-Friendly)

#### Step 1: Stage Your Changes
1. Open VS Code to your project
2. Click on the **"Source Control"** icon in the left sidebar (or press `Ctrl+Shift+G`)
3. You'll see a list of changed files under "Changes"

#### Step 2: Stage Individual Files or All Files
- **Stage all files**: Click the **"+"** button next to "Changes" (hover to see "Stage All Changes")
- **Stage individual files**: Click the **"+"** next to each file you want to commit

#### Step 3: Write a Commit Message
1. In the text box at the top that says "Message", type your commit message
2. Example: "Fix email form - add success message element"
3. Keep it short but descriptive

#### Step 4: Commit Your Changes
- Click the **"Commit"** button (checkmark icon) below your message
- Your changes are now saved locally with a snapshot

#### Step 5: Push to GitHub
1. Look for the **"Sync Changes"** button in the bottom status bar of VS Code
   - It shows a cloud icon with an arrow (or "1↑ 1↓")
2. Click it to push your committed changes to GitHub
3. Alternatively, after committing, you'll see a prompt to "Sync" - click "OK"

**Success!** Your changes are now live on GitHub and will auto-deploy if using Cloudflare Pages.

---

### Method B: Using Terminal (Command Line)

#### Step 1: Check Status
```bash
git status
```
This shows you which files have been modified.

#### Step 2: Stage Your Changes
```bash
# Stage all files
git add -A

# Or stage specific files
git add index.html
git add assets/js/main.js
```

#### Step 3: Write a Commit Message
```bash
git commit -m "Fix email form - add success message element"
```

#### Step 4: Push to GitHub
```bash
# Push to main branch
git push origin main

# Or simply (if origin main is already set)
git push
```

**Success!** Your changes are now on GitHub.

---

### Quick Reference: Terminal Commands

| Command | What It Does |
|---------|-------------|
| `git status` | See what files changed |
| `git add -A` | Stage all changes |
| `git commit -m "message"` | Save changes with a message |
| `git push` | Upload to GitHub |
| `git pull` | Download latest changes from GitHub |
| `git log` | See commit history |

---

### Best Practices

1. **Write clear commit messages**: Describe what you changed and why
   - Good: "Fix email form - add missing success message element"
   - Bad: "Fixed stuff" or "Updates"

2. **Commit frequently**: Save your work regularly, not just when done

3. **Pull before pushing**: If working on multiple devices, run `git pull` before making changes

4. **Check status**: Always run `git status` before committing to see what you're about to push

---

## Part 5: Email Collection Setup (Optional)

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

