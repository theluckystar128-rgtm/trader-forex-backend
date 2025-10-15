const axios = require('axios');

const getEconomicEvents = async () => {
  try {
    const url = 'https://api.tradingeconomics.com/calendar'; // placeholder
    // Example: fetch from TradingEconomics (you need API key)
    // const res = await axios.get(`${url}?c=YOUR_API_KEY`);
    // return res.data;

    // Mock data for MVP
    const events = [
      { date: '2025-10-16', country: 'USA', impact: 'High', event: 'FOMC Rate Decision' },
      { date: '2025-10-17', country: 'UK', impact: 'Medium', event: 'GDP Release' },
      { date: '2025-10-18', country: 'Japan', impact: 'Low', event: 'Industrial Production' },
    ];
    return events;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { getEconomicEvents };
