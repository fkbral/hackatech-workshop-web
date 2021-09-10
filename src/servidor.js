const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Entidade = require('./schemas/Entidade')
const Campo = require('./schemas/Campo')

require('dotenv').config({
  path: path.join(process.cwd(), ".env.example")
})

const conectarAoBancoDeDados = async () => {
  const nomeDoBancoDoMongo = process.env.MONGODB_DATABASE_NAME
  const usuarioMongo = process.env.MONGODB_USER
  const senhaMongo = process.env.MONGODB_PASSWORD
  await mongoose.connect(`mongodb+srv://${usuarioMongo}:${senhaMongo}@cluster0.cwymy.mongodb.net/${nomeDoBancoDoMongo}?retryWrites=true&w=majority`)
}

const bootstrap = async() => {
  
  await conectarAoBancoDeDados()

  const app = express()

  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))

  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.get('/', async (request, response) => {
    return response.render('')
  })

  app.get('/entidades/novo', async (request, response) => {
    // return response.render('index')
    const campos = await Campo.find()
    return response.render('nova-entidade.ejs', {campos})
  })

  app.get('/users', (request, response) => {
    // return response.send('Olá usuários')
    return response.render('home/usuarios.ejs')
  })

  app.get('/entidades', async (request, response) => {
    const entidades = await Entidade.find().populate("campo")


    return response.render('entidades.ejs', {entidades})
  })

  app.post('/entidades', async (request, response) => {
    const { nome, campo, pontos_de_coleta } = request.body

    const entidade = new Entidade({nome, campo, pontos_de_coleta})

    const entidadeSalva = await entidade.save()

    // return response.send(entidadeSalva)
    return response.redirect('/entidades')
  })

  app.get('/campos', async (request, response) => {
    const campos = await Campo.find()

    return response.render('campos.ejs', {campos})
  })

  app.get('/campos/novo', async (request, response) => {
    return response.render('novo-campo.ejs')
  })

  app.post('/campos', async (request, response) => {
    const { nome } = request.body

    const campoExiste = await Campo.findOne({nome})
    
    if (campoExiste) {
      // return response.status(400).send('Erro... campo já cadastrado')
      return response.redirect('/campos')
    }

    const campo = new Campo({nome})

    await campo.save()

    return response.redirect('/campos')
  })

  app.listen(3000, () => {
    console.log('site rodando em http://localhost:3000')
  })

}

bootstrap()