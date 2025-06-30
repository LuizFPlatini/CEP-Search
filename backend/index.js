const express = require('express');
const cors = require('cors');
const cepRoutes = require('./Routes/cepRoutes');

const app = express();
app.use(cors());

app.get('/sua-rota', (req, res) => {
  res.send('Backend conectado com sucesso!');
});

app.use('/cep/v1', cepRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});