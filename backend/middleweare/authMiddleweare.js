const jwt = require('jsonwebtoken')

const authMiddleweare = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    const verifyUser = jwt.verify(token, 'secret')
    if (verifyUser) {
      req.user = verifyUser
    } else {
      res.status(401).json({ error: true, message: 'Вы не зарегестрированы' })
    }
  } else {
    res
      .status(401)
      .json({ error: true, message: 'Доступ запрещен, Вы не зарегестрированы' })
  }
  next()
}

module.exports = authMiddleweare
