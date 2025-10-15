const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {

    const API_KEY = process.env.FREECURRENCYAPI_KEY;
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${to}&base_currency=${from}`;
    const res = await axios.get(url);
    console.log(res.data.data)
    return res.data.data[to];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const calculateLotSize = async ({ accountBalance, riskPercent, stopLoss, symbol, entryPrice, takeProfit }) => {
  const [base, quote] = symbol.split('/');
  const exchangeRate = await getExchangeRate(base, quote);

  if (!exchangeRate) throw new Error('Failed to get exchange rate');

  const riskAmount = (accountBalance * riskPercent) / 100;
  const stopDistance = Math.abs(entryPrice - stopLoss) * 10000; // for most pairs
  const takeProfitDistance = Math.abs(takeProfit - entryPrice) * 10000;
  const rrRatio = takeProfitDistance && stopDistance
    ? (takeProfitDistance / stopDistance).toFixed(2)
    : 'N/A';

  const lotSize = riskAmount / (stopLoss * 10 * exchangeRate); // simplified pip value calculation
  return {
    positionSize: parseFloat(lotSize.toFixed(2)),
    riskAmount: parseFloat(riskAmount.toFixed(2)),
    rrRatio: `1:${rrRatio}`,
    stopDistance: parseFloat(stopDistance.toFixed(1)),
  };
  // return { lotSize: lotSize.toFixed(2),  };
};

module.exports = { calculateLotSize };
