const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Get the city name from the latitude and longitude
const getCityName = async (latitude, longitude) => {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
        const response = await axios.get(url)
            .catch(error => {
                console.error(error, 'Error fetching city name');
                throw error;
            });
        const city = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
        return city;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching city name');
    }
};

module.exports = { getCityName };
