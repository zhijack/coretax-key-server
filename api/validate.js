// api/validate.js (Vercel serverless format)
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Key dummy (nanti ganti DB)
const validKeys = ['ZHIJACK-2025', 'TEST-KEY-123'];

app.post('/validate', (req, res) => {
  const { key } = req.body;
  if (!key) {
    return res.json({ success: false, message: 'Key required' });
  }
  if (validKeys.includes(key)) {
    res.json({ success: true, message: 'Key valid' });
  } else {
    res.json({ success: false, message: 'Invalid key' });
  }
});

module.exports = app;
