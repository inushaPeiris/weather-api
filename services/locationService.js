const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getCityName = async (latitude, longitude) => {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const response = await axios.get(url);
    const city = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
    return city;
};

module.exports = { getCityName };
