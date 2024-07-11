const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

const cron = require('node-cron');
const User = require('./models/User');
const userRoutes = require('./routes/user');
const { fetchWeatherData, generateWeatherReport } = require('./services/weatherService');
const { sendWeatherReport } = require('./services/emailService');



dotenv.config();

const app = express();

app.use(express.json());

app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/////////////////////////// (working code: weather api)

// const logWeatherData = async (location) => {
//     try {
//         const weatherData = await fetchWeatherData(location);
//         console.log("weatherdata: ", weatherData);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//     }
// };

// // Example call
// logWeatherData('Colombo');


//////////////////////////// working code: generateWeatherReport
// generateWeatherReport().then((response) => {
//     console.log(response);
// });


//////////////////////////// working code: sendWeatherReport
// const sendEmailReport = async (email, weatherReport) => {
//     try {
//         await sendWeatherReport(email, weatherReport);
//     } catch (error) {
//         console.error('Error sending weather report:', error);
//     }
// }
// sendEmailReport("s92068941@ousl.lk", "weather report for colombo: sunny");


// Configure MongoDB with mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!...'))
    .catch(err => console.error(err));
    
    // cron.schedule('0 */3 * * *', async () => {
    //     const users = await User.find();
    //     users.forEach(async (user) => {
    //         const weatherData = await fetchWeatherData(user.location);
    //         const weatherText = await generateWeatherText(weatherData);
    //         const weatherReport = `Weather report for ${user.location}: ${weatherText}`;
    //         await sendWeatherReport(user.email, weatherReport);
    //     });
    // });
    

