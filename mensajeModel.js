const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  mensaje_recibido: {
    type: String,
    required: true,
  },
  mensaje_enviado: {
    type: String,
    required: true,
  },
  id_wa: {
    type: String,
    required: true,
  },
  timestamp_wa: {
    type: Date,
    default: Date.now,
  },
  telefono_wa: {
    type: String,
    required: true,
  },
  hora_whatsapp: {
    type: String,
    required: true,
  },
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
