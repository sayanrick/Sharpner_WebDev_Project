const path = require('path');
const express = require('express');

const contactusController = require('../controllers/contactus');

const router = express.Router();

// contact-us/ => GET
router.get('/', contactusController.getContactUSPage);

module.exports = router;
