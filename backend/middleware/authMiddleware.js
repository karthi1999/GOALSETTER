const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  const validate = req.headers.authorization
  if (validate && validate.startsWith('Bearer')) {
    token = validate.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    try {
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorizied')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Token required')
  }
})

module.exports = { protect }
