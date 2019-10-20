const Team = require('../models/Team')

module.exports = {
  async index(req, res) {
    const {id, role, name} = req.headers

    const Teams =  await Team.find({members: {id, role, name}})
    return res.json(Teams)
  },

  async store(req, res) {
     const {name, members, bio} = req.body
     const teamExists = await Team.findOne({name: name})

    if (teamExists) {
      return res.json(teamExists)
    }

    const createTeam = await Team.create({
      name,
      members, 
      bio
    })
    return res.json(createTeam)
  }
}