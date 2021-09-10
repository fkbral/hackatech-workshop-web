const mongoose = require("mongoose")

const schemaEntidade = new mongoose.Schema({
  // nome: String,
  nome: {
    type: String,
    trim: true,
    // unique: true,
  },
  // campo: String,
  campo: {
    type: String,
    trim: true,
    lowercase: true,
    ref: 'Campo'
  },
  pontos_de_coleta: [],
})

module.exports = mongoose.model('Entidade', schemaEntidade)