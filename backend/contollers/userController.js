const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// DESC   Register user
// Route  POST /api/users
// Access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all field')
  } else {
    const user = await User.findOne({ email })
    if (user) {
      res.status(400)
      throw new Error('User already exist')
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword
      })
      res.status(200).json({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser.id)
      })
    }
  }
})

// DESC   Register user
// Route  POST /api/users
// Access Public
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // check email and password
  if (!user) {
    res.status(400)
    throw new Error('Invalid user')
  } else {

    const checkPass = await bcrypt.compare(password, user.password)
    if (!password || !checkPass) {
      res.status(400)
      throw new Error('Invalid password')
    } else {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    }
  }
})

// DESC   Register user
// Route  POST /api/users
// Access Private
const userDetails = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)

  res.status(201).json({
    id: _id,
    name,
    email
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

module.exports = {
  registerUser,
  LoginUser,
  userDetails
}