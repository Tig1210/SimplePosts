const express = require('express')
const authMiddleweare = require('../middleweare/authMiddleweare')
const fs = require('node:fs')

const router = express.Router()

const db_path_posts = './db/posts/posts.json'

router.post('/addCard', authMiddleweare, (req, res) => {
  fs.readFile(db_path_posts, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })

    const jsonData = JSON.parse(data)
    let lastId
    if (jsonData.length === 0) {
      lastId = 0
    } else {
      lastId = jsonData[jsonData.length - 1].id + 1
    }
    jsonData.push({
      id: lastId,
      userId: req.user.id,
      userName: req.user.name,
      ...req.body,
    })
    fs.writeFile(db_path_posts, JSON.stringify(jsonData), (err) => {
      if (err) res.status(400).json({ error: true, message: `${err}` })
      res.status(200).json({ error: false, message: 'Карточка добавлена' })
    })
  })
})

router.get('/getUserCards/:id', authMiddleweare, (req, res) => {
  console.log('req', req.params.id)
  console.log('req user', req.user)
  fs.readFile(db_path_posts, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    let usersCards
    if (req.params.id !== 'undefined') {
      usersCards = jsonData.filter(
        (cards) => cards.userId === Number(req.params.id)
      )
    } else {
      usersCards = jsonData.filter((cards) => cards.userId === +req.user.id)
    }

    console.log('USER', usersCards)

    res.status(200).json({ error: false, data: usersCards })
  })
})

router.get('/getAllCards', authMiddleweare, (req, res) => {
  fs.readFile(db_path_posts, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    res.status(200).json({ error: false, data: jsonData })
  })
})

router.delete('/deleteCard/:id', authMiddleweare, (req, res) => {
  fs.readFile(db_path_posts, 'utf8', (err, data) => {
    if (err)
      if (err)
        res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    console.log(data)

    let jsonData = JSON.parse(data)
    findIndex = jsonData.findIndex((el) => el.id === Number(req.params.id))
    console.log(findIndex)
    if (findIndex > -1) {
      jsonData.splice(findIndex, 1)
    }
    fs.writeFile(db_path_posts, JSON.stringify(jsonData), (err) => {
      if (err) res.status(400).json({ error: true, message: `${err}` })
      res.status(200).json({ error: false, message: 'Карточка удалена' })
    })
  })
})

router.get('/getCardById/:id', authMiddleweare, (req, res) => {
  fs.readFile(db_path_posts, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    console.log(req.params.id)
    const cardByid = jsonData.find(
      (cards) => cards.id === Number(req.params.id)
    )
    console.log(cardByid)
    res.status(200).json({ error: false, data: cardByid })
  })
})

module.exports = router
