const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// success/ => GET
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = router;