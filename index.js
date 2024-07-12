/**
 * Version: 1.0.0
 * Date: July 2024
 * Author: Inusha Peiris
 * Description: Main entry point of the application.
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

const cron = require('node-cron');
const User = require('./models/User');
const userRoutes = require('./routes/user');
const { fetchWeatherData, generateWeatherReport } = require('./services/weatherService');
const { sendWeatherReport } = require('./services/emailService');

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();
app.use(express.json());
app.use('/', userRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Configure MongoDB with mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!...'))
    .catch(err => console.error(err));

// Schedule a cron job to send weather reports to users every 3 hours:
cron.schedule('* * * * *', async () => {
    const users = await User.find();
    users.forEach(async (user) => {
        const weatherData = await fetchWeatherData(user.location);
        const weatherDataString = JSON.stringify(weatherData, null, 2);
        const weatherReport = `Weather report for ${user.location}: ${weatherDataString}`;
        // console.log(weatherReport);
        
        // await sendWeatherReport(user.email, weatherReport);
    });
});
