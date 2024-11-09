require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
// const serve  = require('./server.js')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados
mongoose.connect(process.env.DB_URI)
   .then(() => console.log("Conectado ao banco de dados!"))
   .catch(err => console.log("Erro de conexão: ", err));

// Rotas
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/obras', require('./routes/obraRoutes'));
app.use('/api/auth', authRoutes);  // Rota para login
app.use('/api/admin', adminRoutes);  // Rota para gerenciamento admin
// app.use('/api/server', serve);

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});
