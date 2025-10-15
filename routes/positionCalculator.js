const express = require('express');
const router = express.Router();
const { calculateLotSize } = require('../services/positionCalculatorService');

router.post('/calculate', async (req, res) => {
  try {

    const { accountBalance, riskPercent, stopLoss, symbol, entryPrice, takeProfit } = req.body;
    const result = await calculateLotSize({ accountBalance, riskPercent, stopLoss, symbol, entryPrice, takeProfit });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
