// src/routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Website/new.html'));
});

module.exports = router;
