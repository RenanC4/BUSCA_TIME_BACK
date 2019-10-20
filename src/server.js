const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const server = express()
mongoose.connect('mongodb+srv://buscatime:buscatime@btcluster-rwc9z.mongodb.net/buscatime?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(routes)

server.listen(3333)