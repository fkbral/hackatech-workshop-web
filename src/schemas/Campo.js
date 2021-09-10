const mongoose = require("mongoose")

const schemaCampo = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
})

module.exports = mongoose.model('Campo', schemaCampo)