const express = require('express')
const fs = require('node:fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const db_path_users = './db/users/users.json'

router.post('/login', (req, res) => {
  fs.readFile(db_path_users, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    const findUser = jsonData.find((user) => user.login === req.body.login)
    if (!findUser) {
      res.status(400).json({
        error: true,
        message:
          'Такого пользователя не существует, проверьте правильность данных',
      })
    } else {
      bcrypt.compare(req.body.password, findUser.password, (err, result) => {
        if (err)
          res.status(400).json({
            error: true,
            message: `${err}`,
          })

        if (result) {
          const accessToken = jwt.sign(findUser, 'secret')
          res.status(200).json({ token: accessToken })
        } else {
          res.status(400).json({ error: true, message: 'Неверный пароль' })
        }
      })
    }
  })
})

router.post('/registration', (req, res) => {
  fs.readFile(db_path_users, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })

    const salt = bcrypt.genSaltSync(10)
    const jsonData = JSON.parse(data)
    const findUser = jsonData.find((user) => user.login === req.body.login)
    console.log(findUser)
    if (findUser)
      res.status(400).json({
        error: true,
        message: 'Пользователь с таким логином существует',
      })

    let lastId
    if (jsonData.length === 0) {
      lastId = 0
    } else {
      lastId = jsonData[jsonData.length - 1].id + 1
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) res.status(400).json({ error: true, message: `${err}` })
      jsonData.push({
        id: lastId,
        ...req.body,
        password: hash,
      })
      fs.writeFile(db_path_users, JSON.stringify(jsonData), (err) => {
        if (err) res.status(400).json({ error: true, message: `${err}` })

        res
          .status(200)
          .json({ error: false, message: 'Пользователь зарегестрирован' })
      })
    })
  })
})

module.exports = router
