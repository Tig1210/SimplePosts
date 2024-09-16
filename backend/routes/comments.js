const express = require('express')
const authMiddleweare = require('../middleweare/authMiddleweare')
const fs = require('node:fs')

const router = express.Router()

const db_path_comments = './db/comments/comments.json'

router.get('/getAllComments', authMiddleweare, (req, res) => {
  fs.readFile(db_path_comments, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    res.status(200).json({ error: false, data: jsonData })
  })
})

router.get('/getComments/:id', authMiddleweare, (req, res) => {
  console.log(req.params.id)
  fs.readFile(db_path_comments, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    const commentsById = jsonData.filter(
      (comment) => comment.postId === +req.params.id
    )
    res.status(200).json({ error: false, data: commentsById })
  })
})

router.post('/postComment', authMiddleweare, (req, res) => {
  fs.readFile(db_path_comments, 'utf8', (err, data) => {
    if (err)
      res.status(400).json({ error: true, message: 'Ошибка чтения файла' })
    const jsonData = JSON.parse(data)
    let lastId
    if (jsonData.length === 0) {
      lastId = 0
    } else {
      lastId = jsonData[jsonData.length - 1].id + 1
    }
    const comment = {
      id: lastId,
      ...req.body,
    }
    jsonData.push(comment)
    fs.writeFile(db_path_comments, JSON.stringify(jsonData), (err) => {
      if (err) res.status(400).json({ error: true, message: `${err}` })
      res.status(200).json({ error: false, message: 'Комментарий добавлен' })
    })
  })
})

module.exports = router
