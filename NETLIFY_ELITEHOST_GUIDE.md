# 🚀 Publishing to Netlify + Elite Host Domain

## Complete Setup Guide for www.dazzlinganglesspa.co.za

---

## Overview

**Hosting**: Netlify (Free, Fast, Reliable)  
**Domain Registrar**: Elite Host (South African)  
**Domain**: dazzlinganglesspa.co.za  
**Total Cost**: ~R60-R150/year (domain only, hosting is FREE!)

---

## Part 1: Deploy to Netlify (10 minutes)

### Step 1: Create Netlify Account

1. **Go to Netlify**
   - Visit: https://www.netlify.com
   - Click "Sign up" (top right)

2. **Sign up with GitHub** (Recommended)
   - Click "GitHub" button
   - Authorize Netlify to access your GitHub
   - This makes deployment automatic!

### Step 2: Deploy Your Site

1. **Import from GitHub**
   - After signing in, click "Add new site"
   - Select "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify if prompted

2. **Select Repository**
   - Find and click: `Maanda1738/dazzling-angels-spa`

3. **Configure Build Settings**
   - **Branch to deploy**: `main`
   - **Build command**: Leave empty (or type: `echo 'No build required'`)
   - **Publish directory**: `.` (just a dot)
   - Click **Deploy site**

4. **Wait for Deployment** (2-3 minutes)
   - Watch the deploy log
   - You'll see: ✅ "Site is live"
   - You'll get a random URL like: `https://random-name-12345.netlify.app`

5. **Change Site Name** (Optional but recommended)
   - Go to "Site settings"
   - Click "Change site name"
   - Enter: `dazzling-angels-spa` (or any available name)
   - Your URL becomes: `https://dazzling-angels-spa.netlify.app`

🎉 **Your website is now live!** Test it at your Netlify URL.

---

## Part 2: Register Domain with Elite Host (15 minutes)

### Step 1: Go to Elite Host

1. **Visit Elite Host**
   - Website: https://elitehost.co.za
   - Or: https://www.elitehost.co.za/domains

2. **Search for Domain**
   - In the search box, type: `dazzlinganglesspa.co.za`
   - Click "Search"
   - Check if it's available ✅

3. **Purchase Domain**
   - Click "Add to cart" or "Register"
   - Choose registration period: 1 year (can renew)
   - Expected cost: ~R60-R150/year

4. **Complete Purchase**
   - Create account or sign in
   - Enter your details
   - Complete payment
   - You'll receive confirmation email

---

## Part 3: Connect Domain to Netlify (10 minutes)

### Step 1: Add Custom Domain in Netlify

1. **Go to Your Site Dashboard**
   - Login to Netlify: https://app.netlify.com
   - Click on your site: `dazzling-angels-spa`

2. **Add Domain**
   - Click "Domain settings" (or "Set up a custom domain")
   - Click "Add custom domain"
   - Enter: `www.dazzlinganglesspa.co.za`
   - Click "Verify"
   - Click "Add domain"

3. **Add Apex Domain Too** (Optional)
   - Click "Add domain alias"
   - Enter: `dazzlinganglesspa.co.za` (without www)
   - Click "Add domain"

4. **Get DNS Records**
   - Netlify will show you what DNS records to add
   - Keep this page open - you'll need these values!

### Step 2: Configure DNS in Elite Host

1. **Login to Elite Host**
   - Go to: https://manage.elitehost.co.za (or client area)
   - Sign in with your account

2. **Access Domain Management**
   - Find "Domains" or "My Domains"
   - Click on: `dazzlinganglesspa.co.za`
   - Look for "DNS Management" or "Nameservers"

3. **Add DNS Records**

   Add these records in Elite Host DNS:

   **Option A: Using Netlify DNS (Recommended - Easier)**
   
   Change Nameservers to:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   *(Netlify will provide exact nameservers in your dashboard)*

   **Option B: Using Elite Host DNS (Manual Setup)**
   
   Add these records:

   **CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Value: dazzling-angels-spa.netlify.app
   TTL: 3600
   ```

   **A Record (for apex domain without www):**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 3600
   ```

   **AAAA Record (IPv6 - optional but recommended):**
   ```
   Type: AAAA
   Name: @
   Value: 2600:1f1c:4e0:4f00::1
   TTL: 3600
   ```

   *(Check Netlify dashboard for current IPs as they may change)*

4. **Save Changes**
   - Click "Save" or "Update DNS"
   - Changes may take 5 minutes to 48 hours

---

## Part 4: Enable HTTPS in Netlify (Automatic)

1. **Wait for DNS Propagation** (15 minutes - 48 hours)
   - Check status: https://dnschecker.org
   - Enter: `dazzlinganglesspa.co.za`

2. **Netlify Auto-Provisions SSL**
   - Once DNS is verified, Netlify automatically:
     - Issues FREE SSL certificate (Let's Encrypt)
     - Enables HTTPS
     - Forces HTTPS redirect

3. **Verify SSL**
   - Go to: Domain settings → HTTPS
   - Should show: ✅ "Certificate active"
   - Usually takes 15-30 minutes after DNS verification

---

## Part 5: Update Backend URL (If Using Render Backend)

If you set up the backend from DEPLOYMENT_GUIDE.md:

1. **Update CORS in Backend**
   - Go to Render dashboard
   - Find your backend service
   - Add environment variable:
     ```
     ALLOWED_ORIGINS=https://www.dazzlinganglesspa.co.za,https://dazzlinganglesspa.co.za
     ```

---

## Timeline

| Step | Time Required |
|------|---------------|
| Netlify account & deployment | 10 minutes |
| Domain registration (Elite Host) | 15 minutes |
| DNS configuration | 10 minutes |
| DNS propagation | 15 min - 48 hours |
| SSL certificate (auto) | 15-30 minutes after DNS |

**Total active work**: 35 minutes  
**Total waiting**: Usually 1-2 hours, max 2 days

---

## Final Checklist

Before going live:

- ✅ Netlify account created
- ✅ Site deployed to Netlify
- ✅ Domain registered with Elite Host
- ✅ Custom domain added in Netlify
- ✅ DNS records configured in Elite Host
- ✅ DNS propagation complete
- ✅ SSL certificate active (HTTPS working)
- ✅ Test website at www.dazzlinganglesspa.co.za
- ✅ Test booking form
- ✅ Verify email notifications work

---

## Testing Your Site

After DNS propagates, test these URLs:

✅ https://www.dazzlinganglesspa.co.za  
✅ https://dazzlinganglesspa.co.za (should redirect to www)  
✅ http://www.dazzlinganglesspa.co.za (should redirect to HTTPS)

Test functionality:
- All pages load correctly
- Images and videos display
- Navigation works
- Booking form submits
- Email notifications arrive

---

## Advantages of Netlify + Elite Host

**Why Netlify:**
- ✅ FREE hosting forever
- ✅ Automatic deployments from GitHub (push code = live instantly!)
- ✅ FREE SSL certificates (HTTPS)
- ✅ Global CDN (fast loading worldwide)
- ✅ 100GB bandwidth/month free
- ✅ Automatic form handling
- ✅ Easy domain management
- ✅ Better than GitHub Pages!

**Why Elite Host:**
- ✅ South African company
- ✅ ZAR pricing (no forex fees)
- ✅ Local support
- ✅ Affordable .co.za domains
- ✅ Good reputation

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Netlify Hosting | FREE |
| SSL Certificate | FREE (included) |
| Elite Host Domain | ~R60-R150/year |
| Render Backend | FREE (or R120/month for paid) |
| **TOTAL** | **~R5-R13/month** |

---

## Automatic Updates

Once set up, your workflow is simple:

1. Make changes locally
2. Run: `git add . && git commit -m "Update" && git push`
3. Netlify automatically deploys in 1-2 minutes!
4. Your site is updated! 🎉

---

## Troubleshooting

### Site not loading after 48 hours?
- Check DNS with: https://dnschecker.org
- Verify DNS records in Elite Host match Netlify requirements
- Check Netlify deploy logs for errors

### SSL certificate not working?
- Wait 30 minutes after DNS verification
- Go to Domain settings → HTTPS → "Verify DNS configuration"
- Try "Renew certificate"

### Changes not showing up?
- Check Netlify deploy log (should auto-deploy on git push)
- Clear browser cache (Ctrl+Shift+R)
- Check you pushed to correct branch (main)

### Form not working?
- Make sure form has `netlify` attribute
- Check Netlify Forms dashboard
- Verify Render backend is running (if using custom backend)

---

## Elite Host Support

If you need help with Elite Host:
- **Website**: https://elitehost.co.za
- **Support**: support@elitehost.co.za
- **Phone**: Check their website for current number
- **Help Center**: Look for knowledge base/support articles

---

## Netlify Support

- **Help Docs**: https://docs.netlify.com
- **Community**: https://answers.netlify.com
- **Status**: https://www.netlifystatus.com

---

## 🎉 Ready to Go Live!

Follow the steps above and you'll have your professional website live at:

**https://www.dazzlinganglesspa.co.za**

In about 1-2 hours (or up to 48 hours for DNS)!

**Good luck! Your spa website looks amazing! 💅✨**
