# 🚀 Deployment Guide for Dazzling Angels Day Spa Backend

## Quick Start Checklist

✅ Step 1: Set up Gmail App Password
✅ Step 2: Deploy backend to Render (free hosting)
✅ Step 3: Update frontend with backend URL
✅ Step 4: Test the booking system

---

## Step 1: Gmail App Password Setup (5 minutes)

Your backend needs a special password to send emails from Gmail.

### Instructions:

1. **Go to Google Account Security**
   - Visit: https://myaccount.google.com/security
   - Sign in with: Dazangelspa@gmail.com

2. **Enable 2-Step Verification** (if not already enabled)
   - Scroll to "How you sign in to Google"
   - Click "2-Step Verification"
   - Follow the setup wizard

3. **Create App Password**
   - Go back to: https://myaccount.google.com/security
   - Under "How you sign in to Google", find "App passwords"
   - Click "App passwords"
   - Select:
     * App: **Mail**
     * Device: **Other (Custom name)**
   - Type: "Dazzling Angels Spa"
   - Click **Generate**
   
4. **Copy the 16-character password**
   - Example: `abcd efgh ijkl mnop` (remove spaces)
   - Save it: `abcdefghijklmnop`
   - **Keep this password safe!**

---

## Step 2: Deploy Backend to Render (10 minutes)

Render offers free hosting for your backend server.

### Instructions:

1. **Sign Up for Render**
   - Go to: https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub (recommended)

2. **Create New Web Service**
   - Click the "New +" button (top right)
   - Select "Web Service"
   - Click "Connect account" to link GitHub
   - Find and select: `Maanda1738/dazzling-angels-spa`
   - Click "Connect"

3. **Configure the Service**
   Fill in these settings:

   **Basic Settings:**
   - **Name**: `dazzling-angels-booking-api`
   - **Region**: Choose closest to South Africa (Frankfurt or Singapore)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Plan:**
   - Select: **Free** (0$/month)

4. **Add Environment Variables**
   Scroll down to "Environment Variables" section and add:

   | Key | Value |
   |-----|-------|
   | `EMAIL_USER` | `Dazangelspa@gmail.com` |
   | `EMAIL_PASSWORD` | Your 16-char app password from Step 1 |
   | `PORT` | `3000` |

5. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your backend URL will be: `https://dazzling-angels-booking-api.onrender.com`
   - **COPY THIS URL** - you'll need it!

---

## Step 3: Update Frontend with Backend URL (2 minutes)

Now connect your website to the backend.

### Instructions:

1. **Open script.js**
   - Find line 128 (approximately)
   - Look for: `const API_URL = 'http://localhost:3000/api/booking';`

2. **Replace with your Render URL**
   ```javascript
   const API_URL = 'https://dazzling-angels-booking-api.onrender.com/api/booking';
   ```

3. **Save the file**

---

## Step 4: Commit and Test (5 minutes)

### Commit changes:
```bash
cd "c:\Users\maand\OneDrive\Desktop\dazzling spa"
git add .
git commit -m "Add custom backend for email bookings"
git push
```

### Test your booking system:

1. **Wait 2-3 minutes** for GitHub Pages to update
2. **Visit your website**: https://maanda1738.github.io/dazzling-angels-spa/
3. **Go to Contact/Book section**
4. **Fill out the booking form** with test data
5. **Click "Confirm Booking"**
6. **Check your email**: Dazangelspa@gmail.com

✅ You should receive a beautifully formatted booking email!

---

## 📧 What You'll Receive

Every booking will send you an email with:

- Customer Name
- Email Address  
- Phone Number
- Preferred Date & Time
- Selected Service
- Special Requests
- Timestamp

---

## 🔧 Troubleshooting

### "Network error" message?
- Check if backend URL is correct in script.js
- Verify Render service is running (check Render dashboard)

### Not receiving emails?
- Verify Gmail App Password is correct in Render environment variables
- Check Gmail spam folder
- Make sure 2-Step Verification is enabled

### Render service sleeping?
- Free Render services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier

---

## 💡 Tips

- **Test regularly** to keep the service awake
- **Check Render logs** if something goes wrong (Logs tab in dashboard)
- **Upgrade to paid plan** ($7/month) to prevent sleeping and get faster response times

---

## Need Help?

If you encounter any issues:
1. Check Render service logs (Dashboard → Your Service → Logs)
2. Verify all environment variables are set correctly
3. Test the API directly: https://your-render-url.onrender.com/

---

## 🎉 You're Done!

Your booking system is now live and sending emails directly to your inbox!
