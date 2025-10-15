const express = require('express');
const router = express.Router();
const { getMarketHours } = require('../services/marketHoursService');

router.get('/', async (req, res) => {
  try {
    const data = await getMarketHours();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch market hours' });
  }
});

module.exports = router;
