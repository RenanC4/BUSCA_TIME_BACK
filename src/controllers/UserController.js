const axios = require('axios')
const User = require('../models/User')
const constants = require('../constants')

module.exports = {
  async index(req, res) {
    const users =  await User.find()
    return res.json(users)
  },

  async userSearch(req, res) {
    const {tags} = req.query
    let tagsSplitado
    !tags ? tagsSplitado = ['#FORFUN'] :  
    tagsSplitado = tags.split(',')
    const users =  await User.find({ tags: { $all: tagsSplitado } })
    return res.json(users)
  },

  async user(req, res) {
    const {_id} = req.query
    const user =  await User.findOne({
      _id
    })
    return res.json(user)
  },

  async store(req, res) {
    console.log(req.body)
    const {name} = req.body
    const userExists = await User.findOne({name: name})

    if (userExists) {
      return res.json(userExists)
    }

    const {id, accountId, summonerLevel} = await axios
    .get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
      { 
        params: {
          api_key: constants.RITO_API_KEY
        }
      }
    ).then(response => {
        return response.data        
    }).catch(err  => {
      return res.json({status: 404, message: 'Usuário não encontrado'})
    })

    const sumonerId = id
    accountId
    name
    const level = summonerLevel
     
    const userFullInfo = await axios.get(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, 
      {
        params: {
          api_key: constants.RITO_API_KEY
        }
      }
      ).then(response => {
      if (response.status === 200) {
        return response.data        
      }
      else return res.json({status: 500, message: 'Usuário não encontrado'})
      })

      let rank = new Array
      userFullInfo.forEach(info => { 
        
        rank.push(
        { 
          ranked: info.queueType, 
          tier: info.tier, rank: info.rank
        }
      )
      })
      let rankTag ;
    rank.length === 0 ? rankTag = '#UNRANKED' :
    rankTag = `#${rank[0].tier}`
    const bio = 'Digite algo legal sobre voce'
    const tags = ['#FORFUN',rankTag,'#ROLE']
    const status = 'online'
    const createUser = await User.create({
      name,
      sumonerId,
      accountId, 
      level,
      bio,
      tags,
      status,
      rank
    })
    return res.json(createUser)
  },

  async update(req, res) {
    const {_id, bio, tags} = req.body.data
    const userExists = await User.findOne({_id})

    if (userExists) {
      const updateUser = await User.updateOne({_id: userExists._id}, {
        $set: {
        bio,
        tags
        }
      })
      console.log(updateUser)
      return  res.json({status: 200, message: 'Usuário editado com sucesso  !'})
    }
    return res.json({status: 404, message: 'Ooops, Usuário não encontrado!'})
  },

  async delete(req, res) {
    const {_id} = req.body
    const userExists = await User.findOne({_id}) 
    const deleteUser = await User.deleteOne({_id: userExists._id})
    console.log(deleteUser)
    return res.json({status: 200, message: 'Usuário removido com sucesso'})
  }

}