const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Endpoint para recibir el JSON de WhatsApp
router.post('/', controller.handleWhatsAppMessage);

module.exports = router;
