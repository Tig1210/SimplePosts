const express = require('express')

const app = express()
const auth = require('./routes/auth')
const cards = require('./routes/cards')
const likes = require('./routes/likes')
const comments = require('./routes/comments')
const user = require('./routes/user')
const cors = require('cors')

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'], // Allow requests from this origin
  })
)
app.use('/api', auth)
app.use('/api', cards)
app.use('/api', likes)
app.use('/api', comments)
app.use('/api', user)

app.listen(5000, () => {
  console.log('Server started')
})
