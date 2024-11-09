const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');  // Importe o modelo de usuário

const secretKey = 'sua_chave_secreta_aqui'; // Substitua com a chave secreta

// Middleware para verificar se o usuário é admin
const verificarAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Acesso negado');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const usuario = Usuario.findById(decoded.id);

    if (usuario.tipoUsuario !== 'admin') {
      return res.status(403).send('Acesso proibido: usuário não é admin');
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).send('Token inválido ou expirado');
  }
};

module.exports = verificarAdmin;
