const mongoose = require('mongoose');
const Usuario = require('../models/User');
const bcrypt = require('bcrypt');

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/manhwa-manga-db')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB', err);
  });


// Dados do admin
const adminData = {
  nickname: 'admin',
  email: 'ramosfellipe630@gmail.com',
  senha: 'admin123',
  tipoUsuario: 'admin',
};

// Criptografar a senha e criar o admin no banco
bcrypt.hash(adminData.senha, 10, async (err, hashedPassword) => {
  if (err) {
    console.log('Erro ao criptografar a senha:', err);
    return;
  }

  const admin = new Usuario({
    nickname: adminData.nickname,
    email: adminData.email,
    senha: hashedPassword,
    tipoUsuario: adminData.tipoUsuario,
  });

  await admin.save();
  console.log('Admin cadastrado com sucesso!');
  mongoose.connection.close();
});
