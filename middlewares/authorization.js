const jwt = require('jsonwebtoken')

const ENV = require('dotenv')
ENV.config()
module.exports = (req, res, next) => {
  console.log('masuk authorize')
  // console.log(req.headers)
  const decoded = jwt.decode(req.headers.token, { complete: true });
  if (decoded.role != 'admin') {
    res.status(401).json({
      message: 'ADMIN ONLY'
    })
  } else {
    next()
  }
}