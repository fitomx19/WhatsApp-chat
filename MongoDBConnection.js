const mongoose = require('mongoose');

class MongoDBConnection {
  constructor() {
    this.url = 'mongodb+srv://fitox1234:kinect123@chatwhatsapp.jkb6thg.mongodb.net/?retryWrites=true&w=majority'; // Reemplaza con tu propia URL y nombre de base de datos
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  async connect() {
    try {
      await mongoose.connect(this.url, this.options);
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
    }
  }
}

module.exports = MongoDBConnection;
