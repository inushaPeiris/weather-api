const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Send an email with the weather report to the user
const sendWeatherReport = async (email, weatherReport) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Hourly Weather Report',
        text: weatherReport
    };

    await transporter.sendMail(mailOptions)
    .catch(error => {
        console.error(error);
    });
};

module.exports = { sendWeatherReport };
