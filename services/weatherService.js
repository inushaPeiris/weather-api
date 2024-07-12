const axios = require('axios');
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Fetch weather data from OpenWeatherMap API
const fetchWeatherData = async (location) => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await axios.get(url)
        .catch(error => {
            console.error(error);
        });
    return response.data;
};

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Generate a weather report using GPT-3
const generateWeatherReport = async (prompt) => {
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: "dwdwd",
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .catch(error => {
        console.error(error);
    });
    return response.data.choices[0].text;
};

module.exports = { fetchWeatherData, generateWeatherReport };
