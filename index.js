const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send({ message: 'Forex Trade API running!' });
});

const marketHoursRoutes = require('./routes/marketHours');
app.use('/api/market-hours', marketHoursRoutes);

const positionRoutes = require('./routes/positionCalculator');
app.use('/api/position-calculator', positionRoutes);

const econRoutes = require('./routes/economicCalendar');
app.use('/api/economic-calendar', econRoutes);

const trackRecordRoutes = require('./routes/trackRecord');
app.use('/api/track-record', trackRecordRoutes);


const liveMarketHoursRoutes = require('./routes/liveMarketHours');
app.use('/api/live-market-hours', liveMarketHoursRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
