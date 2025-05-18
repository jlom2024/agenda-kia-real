const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

const token = 'TU_TOKEN';
const phoneID = '711275242058884';
const apiURL = `https://graph.facebook.com/v17.0/${phoneID}/messages`;

// Ruta de prueba para Render
app.get('/', (req, res) => {
  res.send('AgendaKIA API activa ✨ Usa POST en /enviar-mensaje');
});

// Ruta principal para enviar mensajes
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

// Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor AgendaKIA activo en el puerto ${PORT}`);
});

