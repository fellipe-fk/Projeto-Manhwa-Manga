// routes/obraRoutes.js
const express = require('express');
const router = express.Router();

// Exemplo de rota GET para buscar manhwas
router.get('/manhwas', (req, res) => {
  // Simulando retorno de dados
  const manhwas = [
    { id: 1, title: 'Manhwa 1', author: 'Autor A' },
    { id: 2, title: 'Manhwa 2', author: 'Autor B' }
  ];
  res.json(manhwas); // Retorna os dados no formato JSON
});

module.exports = router;
