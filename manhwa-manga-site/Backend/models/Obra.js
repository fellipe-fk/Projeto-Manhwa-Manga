const mongoose = require('mongoose');

const obraSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   genre: String, // Gênero da obra
   imageUrl: String, // URL da imagem de capa
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referência ao autor
      required: true
   }
});

const Obra = mongoose.model('Obra', obraSchema);

module.exports = Obra;