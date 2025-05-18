const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

const token = 'EACKzzZBdlJMkBOzrV5TuvxirAZCpn8i4j6hcn830HLu20HBSvn55p7uHT89ZAMxmQXldZBHQaWrhPl0TcTkZASFTxmuZByRfeRY1xBbliPoh7jMZB00uZBDB8ZANxSuW2wn3nAVvvChqXOZAw9DsECtIVIqZC2bEj95Ky2ZCcl9rFlGss2Y8qaO67CqJfnZCwdoC4LOVvch74ZCwjGSW4OFuIuWPtFoy5wnhZBP4VLlNeKu';
const phoneID = '711275242058884';
const apiURL = `https://graph.facebook.com/v17.0/${phoneID}/messages`;

app.post('/enviar-mensaje', async (req, res) => {
  const { numeroDestino, mensaje } = req.body;

  try {
    const response = await axios.post(apiURL, {
      messaging_product: 'whatsapp',
      to: numeroDestino,
      type: 'text',
      text: { body: mensaje }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.response.data });
  }
});

app.listen(3000, () => {
  console.log('Servidor AgendaKIA activo en http://localhost:3000');
});