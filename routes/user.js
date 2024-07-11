const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { fetchWeatherData } = require('../services/weatherService');
const { getCityName } = require('../services/locationService');


// Route to store user details
router.post('/users', async (req, res) => {
    console.log("router called")
    const { email, location } = req.body;
    try {
        const weatherData = await fetchWeatherData(location);
        const user = new User({ email, location, weatherData: { date: new Date(), data: weatherData } });
        await user.save();
        console.log("res: ", user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update user's location
router.put('/users/update-location/:email', async (req, res) => {
    const { email } = req.params;
    const { location } = req.body;
    try {
        const weatherData = await fetchWeatherData(location);
        const user = await User.findOneAndUpdate({ email }, {
            location, weatherData:
                { date: new Date(), data: weatherData }
        }, { new: true });
        console.log("res: ", user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to retrieve weather data
router.get('/users/weather/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.weatherData);
        console.log("res: ", user.weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to retrieve location by coordinates
router.get('/locations', async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const location = await getCityName(latitude, longitude);
        res.status(200).json(location);
        console.log("res: ", location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
