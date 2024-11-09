const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/User'); // Importe o modelo de usuário
const router = express.Router();

const secretKey = 'sua_chave_secreta_aqui'; // Substitua com a chave secreta

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Verifique se o usuário existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).send('Usuário não encontrado');
  }

  // Verifique a senha
  const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
  if (!isPasswordValid) {
    return res.status(400).send('Senha inválida');
  }

  // Gere o token JWT
  const token = jwt.sign(
    { id: usuario._id, tipoUsuario: usuario.tipoUsuario },
    secretKey,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    token,
    tipoUsuario: usuario.tipoUsuario,
  });
});

module.exports = router;
