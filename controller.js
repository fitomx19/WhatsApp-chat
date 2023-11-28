const RiveScript = require ('rivescript');

const fs = require('fs');

const handleWebhookGet = (req, res) => {
  const hubVerifyToken = req.query['hub.verify_token'];
  if (hubVerifyToken === 'HolaNovato') {
    console.log('Autenticación correcta.' , req.query['hub.challenge'])
    res.send(req.query['hub.challenge']);
  } else {
    res.status(403).send('Error de autenticación.');
  }
};

const handleWebhookPost = (req, res) => {
  const data = req.body;

  const telefonoCliente = data.entry[0].changes[0].value.messages[0].from;
  const mensaje = data.entry[0].changes[0].value.messages[0].text.body;
  const idWA = data.entry[0].changes[0].value.messages[0].id;
  const timestamp = data.entry[0].changes[0].value.messages[0].timestamp;

  if (mensaje) {

    try{
      var bot = new RiveScript();
      bot.loadFile("restaurante.rive").then(loading_done).catch(loading_error);

      bot.sortReplies();
      username = "local-user";

      bot.reply(username, "Hello, bot!").then(function(reply) {
        console.log("The bot says: " + reply);
        fs.writeFileSync('texto.txt', "respuesta: " + reply + "timestamp: " + timestamp + "\n");
      });
    }catch(err){
      console.log(err);
    }

    console.log(`Número de teléfono: ${telefonoCliente}`);
    console.log(`Mensaje: ${mensaje}`);
    console.log(`ID de WhatsApp: ${idWA}`);
    console.log(`Timestamp: ${timestamp}`);

    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'error', message: 'No hay mensaje recibido.' });
  }
};

const handleTextoGet = (req, res) => {
  const texto = fs.readFileSync('texto.txt', 'utf8');

  res.status(200).json({ status: 'success', message: texto });
}

module.exports = {
  handleWebhookGet,
  handleWebhookPost,
  handleTextoGet,
};
