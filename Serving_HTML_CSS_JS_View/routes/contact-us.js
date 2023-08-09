const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// contact-us/ => GET
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

module.exports = router;