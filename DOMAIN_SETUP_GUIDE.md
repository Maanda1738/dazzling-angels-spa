# 🌐 Publishing Dazzling Angels Spa to dazzlinganglesspa.co.za

## Overview
This guide will help you publish your website to your custom domain: **www.dazzlinganglesspa.co.za**

---

## Step 1: Configure GitHub Pages (5 minutes)

1. **Go to your GitHub repository**
   - Visit: https://github.com/Maanda1738/dazzling-angels-spa

2. **Access Settings**
   - Click the "Settings" tab (top menu)
   - Scroll down to "Pages" in the left sidebar

3. **Configure Source**
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
   - Click **Save**

4. **Enable HTTPS** (Important!)
   - Wait 1-2 minutes for initial deployment
   - Check the box: ☑️ "Enforce HTTPS"

---

## Step 2: Register Your Domain (if not done already)

You need to register **dazzlinganglesspa.co.za** with a domain registrar.

### Recommended Registrars for .co.za domains:
- **ZADNA Accredited Registrars**: https://www.zadna.org.za/content/page/list-of-accredited-registrars/
- **Popular Options**:
  - Afrihost (https://www.afrihost.com)
  - Domains.co.za (https://www.domains.co.za)
  - Xneelo (https://xneelo.co.za)
  - Hetzner (https://hetzner.co.za)

### Cost: 
- Approximately R60-R150 per year for .co.za domain

---

## Step 3: Configure DNS Settings

Once you have your domain, configure these DNS records with your registrar:

### DNS Records to Add:

1. **A Records** (for apex domain - if you want dazzlinganglesspa.co.za without www):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   TTL: 3600
   ```
   ```
   Type: A
   Name: @
   Value: 185.199.109.153
   TTL: 3600
   ```
   ```
   Type: A
   Name: @
   Value: 185.199.110.153
   TTL: 3600
   ```
   ```
   Type: A
   Name: @
   Value: 185.199.111.153
   TTL: 3600
   ```

2. **CNAME Record** (for www subdomain):
   ```
   Type: CNAME
   Name: www
   Value: maanda1738.github.io
   TTL: 3600
   ```

### Where to find DNS settings:
- Login to your domain registrar dashboard
- Look for "DNS Management" or "Domain Management"
- Add the records above

---

## Step 4: Add Custom Domain to GitHub

1. **Go back to GitHub Pages settings**
   - Repository → Settings → Pages

2. **Custom domain section**
   - Enter: `www.dazzlinganglesspa.co.za`
   - Click **Save**

3. **DNS Check**
   - GitHub will verify your DNS settings
   - This may take 24-48 hours for DNS to propagate
   - Once verified, you'll see: ✅ "DNS check successful"

4. **Enable HTTPS** (after DNS verification)
   - Check: ☑️ "Enforce HTTPS"
   - Wait 15-30 minutes for SSL certificate to be issued

---

## Step 5: Commit CNAME File

The CNAME file has been created for you. Now commit it:

```bash
cd "c:\Users\maand\OneDrive\Desktop\dazzling spa"
git add CNAME
git commit -m "Add custom domain configuration"
git push origin main
```

---

## Step 6: Test Your Website

After DNS propagates (24-48 hours), visit:
- ✅ https://www.dazzlinganglesspa.co.za
- ✅ https://dazzlinganglesspa.co.za (if you added A records)

---

## Timeline

| Step | Time Required |
|------|---------------|
| GitHub Pages setup | 5 minutes |
| Domain registration | 15-30 minutes |
| DNS configuration | 5 minutes |
| DNS propagation | 24-48 hours |
| SSL certificate | 15-30 minutes after DNS |

**Total active time**: ~30 minutes  
**Total waiting time**: 1-2 days

---

## Verification Checklist

Before going live, verify:

- ✅ GitHub Pages is enabled and deploying from main branch
- ✅ Domain is registered and paid for
- ✅ DNS records are configured correctly
- ✅ CNAME file is in repository root
- ✅ Custom domain is added in GitHub Pages settings
- ✅ DNS check shows "successful"
- ✅ HTTPS is enforced
- ✅ Website loads at your custom domain
- ✅ All images, videos, and styles load correctly
- ✅ Booking form works and sends emails

---

## Alternative: Use Current GitHub Pages URL

If you want to publish immediately without waiting for domain setup:

Your site is already live at:
**https://maanda1738.github.io/dazzling-angels-spa/**

You can:
1. Use this URL temporarily
2. Set up custom domain later
3. Redirect happens automatically once configured

---

## Cost Summary

### Free (Using GitHub Pages URL):
- Hosting: FREE (GitHub Pages)
- Backend: FREE (Render free tier)
- **Total**: R0/month

### With Custom Domain:
- Hosting: FREE (GitHub Pages)
- Backend: FREE (Render free tier)
- Domain: ~R60-R150/year
- **Total**: ~R5-R13/month

---

## Troubleshooting

### DNS not working after 48 hours?
- Use DNS checker: https://dnschecker.org
- Verify all A and CNAME records are correct
- Check with your domain registrar support

### SSL certificate not issued?
- Make sure DNS is fully propagated first
- Wait 24 hours after DNS verification
- Try disabling and re-enabling HTTPS in settings

### Website shows 404?
- Verify CNAME file is in root directory
- Check GitHub Pages is enabled
- Make sure deploying from correct branch

---

## Need Help?

Contact your domain registrar support for:
- Domain registration assistance
- DNS configuration help
- Nameserver settings

---

## 🎉 Next Steps

1. Push the CNAME file to GitHub (command below)
2. Enable GitHub Pages in repository settings
3. Register your domain
4. Configure DNS records
5. Add custom domain in GitHub Pages
6. Wait for DNS propagation
7. Test your live website!

**You're almost there!** 🚀
