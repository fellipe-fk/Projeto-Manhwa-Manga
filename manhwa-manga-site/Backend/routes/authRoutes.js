const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
   const { email, password, role } = req.body;

   try {
      const user = new User({ email, password, role });
      await user.save();
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
   } catch (err) {
      res.status(400).json({ error: 'Erro ao registrar usuário' });
   }
});

// Login de usuário
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Senha inválida' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
   } catch (err) {
      res.status(500).json({ error: 'Erro ao fazer login' });
   }
});

module.exports = router;
