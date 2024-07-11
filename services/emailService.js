const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendWeatherReport = async (email, weatherReport) => {
    console.log("process.env.MONGODB_URI: ", process.env.GMAIL_USER);

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Hourly Weather Report',
        text: weatherReport
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendWeatherReport };
