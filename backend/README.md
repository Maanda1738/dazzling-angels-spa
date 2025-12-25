# Dazzling Angels Day Spa - Booking Backend

This is the backend API for the Dazzling Angels Day Spa booking system. It handles email notifications for booking requests.

## Setup Instructions

### 1. Gmail App Password Setup
Since you're using Gmail, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left menu
3. Under "How you sign in to Google," enable "2-Step Verification" (if not already enabled)
4. Once 2-Step Verification is enabled, go back to Security
5. Under "2-Step Verification," click on "App passwords"
6. Select "Mail" and "Other (Custom name)" - name it "Dazzling Angels Spa"
7. Click "Generate"
8. Copy the 16-character password (no spaces)

### 2. Local Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```
EMAIL_USER=Dazangelspa@gmail.com
EMAIL_PASSWORD=your_16_char_app_password_here
PORT=3000
```

### 3. Test Locally

```bash
npm start
```

The server will run on http://localhost:3000

### 4. Deploy to Render (FREE)

1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: dazzling-angels-booking-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - `EMAIL_USER`: Dazangelspa@gmail.com
   - `EMAIL_PASSWORD`: your_app_password
6. Click "Create Web Service"

After deployment, you'll get a URL like: `https://dazzling-angels-booking-api.onrender.com`

### 5. Update Frontend

Update your website's form to use the new backend URL (in script.js or index.html)

## Alternative: Deploy to Railway (FREE)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in Settings
5. Deploy!

## Testing the API

### Health Check
```bash
GET https://your-api-url.com/
```

### Submit Booking
```bash
POST https://your-api-url.com/api/booking
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0791234567",
  "date": "2025-01-15",
  "time": "10am",
  "service": "Full Body Massage",
  "message": "Please confirm"
}
```
