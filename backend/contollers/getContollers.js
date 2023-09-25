const asyncHandler = require('express-async-handler')

const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get goal successfully' })
})

const setGoal = asyncHandler(async (req, res) => {
  if (req.body.text) {
    res.status(200).json({ message: 'set goal successfully' })
  } else {
    res.status(400)
    throw new Error('Please add text field')
  }
})

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update goal successfully ${req.params.id}` })
})

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goal successfully ${req.params.id}` })
})

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal
}