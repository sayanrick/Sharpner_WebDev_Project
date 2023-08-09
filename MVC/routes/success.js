const path = require('path');
const express = require('express');

const successController = require('../controllers/success');

const router = express.Router();

// success/ => GET
router.get('/', successController.getSuccessPage);

module.exports = router;