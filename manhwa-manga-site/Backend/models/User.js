const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema para o usuário
const usuarioSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipoUsuario: { type: String, enum: ['comum', 'admin'], default: 'comum' }, // 'comum' por padrão
});

// Criptografar a senha antes de salvar no banco
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Comparar a senha fornecida com a armazenada no banco
usuarioSchema.methods.compararSenha = async function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
