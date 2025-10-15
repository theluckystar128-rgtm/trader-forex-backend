const express = require('express');
const axios = require('axios');
const { DateTime } = require('luxon');
const router = express.Router();
const MARKETSTACK_KEY = process.env.MARKETSTACK_KEY;

const exchanges = [
  {
    name: 'Sydney',
    mic: 'XASX',
    timezone: 'Australia/Sydney',
    open: '10:00',
    close: '17:00',
    color: '#6FCF97'
  },
  {
    name: 'Tokyo',
    mic: 'XTKS',
    timezone: 'Asia/Tokyo',
    open: '09:00',
    close: '15:00',
    color: '#F2994A'
  },
  {
    name: 'London',
    mic: 'XLON',
    timezone: 'Europe/London',
    open: '08:00',
    close: '16:30',
    color: '#56CCF2'
  },
  {
    name: 'New York',
    mic: 'XNYS',
    timezone: 'America/New_York',
    open: '09:30',
    close: '16:00',
    color: '#EB5757'
  }
];

async function getExchangeInfo(mic) {
  const url = `https://api.marketstack.com/v2/exchanges/${mic}?access_key=${MARKETSTACK_KEY}`;
  const res = await axios.get(url);
  return res.data;
}

router.get('/', async (req, res) => {
  try {
    const results = exchanges.map((ex) => {
      const nowLocal = DateTime.now().setZone(ex.timezone);

      const [oh, om] = ex.open.split(':').map(Number);
      const [ch, cm] = ex.close.split(':').map(Number);

      const openTime = nowLocal.set({ hour: oh, minute: om, second: 0 });
      const closeTime = nowLocal.set({ hour: ch, minute: cm, second: 0 });
      const isOpen = nowLocal >= openTime && nowLocal < closeTime;

      return {
        name: ex.name,
        mic: ex.mic,
        timezone: ex.timezone,
        open: ex.open,
        close: ex.close,
        isOpen,
        openUtc: openTime.toUTC().toISO(),
        closeUtc: closeTime.toUTC().toISO(),
        color: ex.color
      };
    });

    res.json({ markets: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get market hours' });
  }
});

module.exports = router;