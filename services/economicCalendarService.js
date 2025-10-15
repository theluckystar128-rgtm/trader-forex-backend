const axios = require('axios');
const API_KEY = process.env.ECONOMIC_CALENDAR_API_KEY; // Set your API key in environment variables

const getEconomicEvents = async () => {
  try {
    const url = 'https://api.tradingeconomics.com/calendar'; // placeholder
    // Example: fetch from TradingEconomics (you need API key)
    const res = await axios.get(`${url}?c=${API_KEY}`);

    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { getEconomicEvents };
