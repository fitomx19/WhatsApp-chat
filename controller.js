// controller.js
const handleWhatsAppMessage = (req, res) => {
    const jsonData = req.body;
  
    console.log('Mensaje de WhatsApp recibido:');
    console.log(jsonData);
  
    res.send('Mensaje recibido exitosamente');
  };
  
  module.exports = {
    handleWhatsAppMessage,
  };
  