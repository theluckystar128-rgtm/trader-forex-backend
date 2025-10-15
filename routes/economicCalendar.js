const express = require('express');
const router = express.Router();
const { getEconomicEvents } = require('../services/economicCalendarService');

router.get('/', async (req, res) => {
  try {
    const data = await getEconomicEvents();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch economic events' });
  }
});

module.exports = router;
