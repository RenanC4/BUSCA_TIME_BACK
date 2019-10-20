const express = require('express')
const UserController = require('./controllers/UserController')
const TeamController = require('./controllers/TeamController')

const routes = express.Router()

routes.get('/users', UserController.index)
routes.get('/users/user', UserController.user)
routes.get('/users/userSearch', UserController.userSearch)
routes.post('/users', UserController.store)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.get('/teams', TeamController.index)
routes.post('/teams', TeamController.store)

module.exports = routes