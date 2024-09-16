const express = require('express')
const authMiddleweare = require('../middleweare/authMiddleweare')

const fs = require('node:fs')

const router = express.Router()

const db_path_users = './db/users/users.json'

router.get('/getUserInfo/:id', authMiddleweare, (req, res) => {
  console.log(req.params)
  fs.readFile(db_path_users, 'utf8', (err, data) => {
    if (err) res.status(400)
    if (req.params.id !== 'undefined') {
      const jsonData = JSON.parse(data)
      const findUser = jsonData.find((user) => user.id === +req.params.id)
      const user = {
        id: findUser.id,
        name: findUser.name,
        birth: findUser.birth,
      }
      if (findUser) {
        res.status(200).json({ data: user })
      } else {
        res.status(400).json({})
      }
    } else {
      return undefined
    }
  })
})

module.exports = router
