const axios = require('axios');
const express = require('express');
const app = express();

// Middlewares necesarios para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables de configuración
const token = 'EACKzzZBdlJMkBOyZCVvSU2fFepTX5r0ZBayZAg1j4bLg0XVrY5y3y3WjQ6uzpZAkZC1Mse5SZCQUVPHYEKM49YFjNrJGjOmzgKKmsY7WnpnoKAWEkNSR8Bj9p99fUaM3gduqBSUehKeZBOcYioNlKBKxYsXFRcQ9QxVoPVaWbHothV2gSc64iCAOjXzNjYHHws4A0QbIsz5qKof75mCU56Xs4Ab3ap4gVRWPDL7n';
const phoneID = '711275242058884';
const apiURL = `https://graph.facebook.com/v17.0/${phoneID}/messages`;

// Ruta de prueba para verificar que la API responde
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
      text: { body: mensaje },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor AgendaKIA activo en el puerto ${PORT}`);
});

