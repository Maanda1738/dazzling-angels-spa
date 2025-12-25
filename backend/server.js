const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Dazzling Angels Day Spa Booking API is running' });
});

// Booking endpoint
app.post('/api/booking', async (req, res) => {
    const { name, email, phone, date, time, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !service) {
        return res.status(400).json({ 
            success: false, 
            message: 'All required fields must be filled' 
        });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Email content
    const emailContent = `
        <h2>New Booking Request from Dazzling Angels Day Spa Website</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${date}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${time}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Special Requests:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${message || 'None'}</td>
            </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">
            <em>This booking was submitted from your website on ${new Date().toLocaleString()}</em>
        </p>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Booking - ${name} - ${service}`,
        html: emailContent
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: 'Booking request sent successfully! We will contact you shortly.' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send booking request. Please try again or contact us directly.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
