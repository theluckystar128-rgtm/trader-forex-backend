const express = require('express');
const router = express.Router();
const { db, bucket } = require('../firebase');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Get all trades
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('trades').orderBy('date','desc').get();
    const trades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(trades);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new trade
router.post('/', upload.single('screenshot'), async (req, res) => {
  try {
    const { note, date, screenshotBase64 } = req.body;
    let screenshotUrl = null;

    if (req.file) {
      const blob = bucket.file(`screenshots/${Date.now()}_${req.file.originalname}`);
      const blobStream = blob.createWriteStream({ resumable: false });
      blobStream.end(req.file.buffer);
      screenshotUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    }

    const docRef = await db.collection('trades').add({ note, date, screenshotUrl, screenshotBase64 });
    res.json({ id: docRef.id });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
