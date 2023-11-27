// routes.js
const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/webhook', controller.handleWebhookGet);
router.post('/webhook', controller.handleWebhookPost);

module.exports = router;
