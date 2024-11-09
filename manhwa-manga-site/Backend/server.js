const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(express.json()); // Para ler dados JSON do corpo da requisição

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost/manhwa_manga', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema do Usuário
const usuarioSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipoUsuario: { type: String, enum: ['comum', 'admin'], default: 'comum' },
  favoritos: [String],
  leitura: String,
});

// Modelo do Usuário
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rota para verificar se é o primeiro usuário
app.get('/api/verificar-admin', async (req, res) => {
  const count = await Usuario.countDocuments();
  if (count === 0) {
    return res.json({ isFirstUser: true }); // Se for o primeiro usuário, esse será o admin
  }
  res.json({ isFirstUser: false });
});

// Rota para Cadastro
app.post('/api/cadastro', async (req, res) => {
  const { nickname, email, senha, tipoUsuario } = req.body;

  // Criptografando a senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  const usuario = new Usuario({ nickname, email, senha: hashedPassword, tipoUsuario });
  try {
    await usuario.save();
    res.status(201).send('Usuário cadastrado com sucesso');
  } catch (error) {
    res.status(400).send('Erro ao cadastrar usuário');
  }
});

// Rota para Login
app.post('/api/login', async (req, res) => {
  const { nickname, senha } = req.body;

  const usuario = await Usuario.findOne({ nickname });
  if (!usuario) {
    return res.status(400).send('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
  if (!isPasswordValid) {
    return res.status(400).send('Senha inválida');
  }

  res.status(200).send('Login realizado com sucesso');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
