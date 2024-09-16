const express = require('express')
const fs = require('node:fs')
const authMiddleweare = require('../middleweare/authMiddleweare')

const router = express.Router()

const db_path_likes = './db/likes/likes.json'

router.get('/getLike', authMiddleweare, (req, res) => {
  fs.readFile(db_path_likes, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    res.status(200).json({ error: false, data: jsonData })
  })
})

router.put('/like', authMiddleweare, (req, res) => {
  fs.readFile(db_path_likes, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)

    const findLike = jsonData.find(
      (like) =>
        like.postId === req.body.postId && like.userId === req.body.userId
    )
    if (findLike) {
      const findIndex = jsonData.findIndex(
        (like) =>
          like.postId === findLike.postId && like.userId === findLike.userId
      )
      if (findIndex > -1) {
        jsonData.splice(findIndex, 1)
        fs.writeFile(db_path_likes, JSON.stringify(jsonData), (err) => {
          if (err) res.status(400)
          res.status(200).json({ error: false, message: 'Лайк удален' })
        })
      }
    } else {
      let lastId
      if (jsonData.length === 0) {
        lastId = 0
      } else {
        lastId = jsonData[jsonData.length - 1].id + 1
      }

      const like = { id: lastId, ...req.body }
      jsonData.push(like)
      fs.writeFile(db_path_likes, JSON.stringify(jsonData), (err) => {
        if (err) res.status(400)
        res.status(200).json({ error: false, message: 'Лайк добавлен' })
      })
    }
  })
})

module.exports = router
