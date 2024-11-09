const express = require('express');
const Usuario = require('../models/User');
const verificarAdmin = require('../middleware/verificarAdmin');  // Importe o middleware

const router = express.Router();

// Rota para deletar um usuário (exemplo de funcionalidade admin)
router.delete('/usuarios/:id', verificarAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndDelete(id);
    res.status(200).send('Usuário deletado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao deletar o usuário');
  }
});

module.exports = router;
