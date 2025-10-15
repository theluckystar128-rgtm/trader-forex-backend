// Mock example for now. Later we can integrate TradingEconomics API
const axios = require('axios');

const getMarketHours = async () => {
  // Example static data (Sydney, Tokyo, London, New York)

const now = new Date();
  const nowGMT = new Date(now.toUTCString());
  const currentHour = nowGMT.getUTCHours();
  const currentMinute = nowGMT.getUTCMinutes();

  const isBetween = (start, end) => {
    const current = currentHour + currentMinute / 60;
    const s = parseInt(start.split(':')[0]) + parseInt(start.split(':')[1]) / 60;
    const e = parseInt(end.split(':')[0]) + parseInt(end.split(':')[1]) / 60;

    // Handle overnight sessions (e.g. 22:00 → 07:00)
    if (s < e) {
      return current >= s && current < e;
    } else {
      return current >= s || current < e;
    }
  };

  const sessions = [
    { name: 'Sydney', open: '22:00', close: '07:00', timezone: 'GMT+10', color: '#6FCF97' },
    { name: 'Tokyo', open: '23:00', close: '08:00', timezone: 'GMT+9', color: '#F2994A' },
    { name: 'London', open: '07:00', close: '16:00', timezone: 'GMT+0', color: '#56CCF2' },
    { name: 'New York', open: '12:00', close: '21:00', timezone: 'GMT-5', color: '#EB5757' },
  ];

  const openSessions = sessions.map(s => ({'name':s.name, 'open':s.open, 'close':s.close, 'timezone': s.timezone, 'color': s.color, 'isOpen': isBetween(s.open, s.close)}));

  return Promise.resolve ({
    currentTimeGMT: nowGMT.toISOString(),
    openSessions: openSessions.map(s => s.name),
    markets: openSessions
  });

//   const markets = [
//     { name: 'Sydney', open: '07:00', close: '16:00', timezone: 'GMT+10' },
//     { name: 'Tokyo', open: '09:00', close: '18:00', timezone: 'GMT+9' },
//     { name: 'London', open: '08:00', close: '17:00', timezone: 'GMT+0' },
//     { name: 'New York', open: '13:00', close: '22:00', timezone: 'GMT-5' },
//   ];
//   return markets;
};

module.exports = { getMarketHours };
