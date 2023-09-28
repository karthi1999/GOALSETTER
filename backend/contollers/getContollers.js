const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// DESC   Get goal
// Route  GET /api/goals

// Access Private
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id })

  if (!goal) {
    req.status(400)
    throw new Error('Goal not found')
  }
  res.status(200).json(goal)
})

// DESC   Set goal
// Route  SET /api/goals
// Access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add text field')
  }


  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal)
})

// DESC   update goal
// Route  PUT /api/goals
// Access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // check user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(403)
    throw new Error('User not found')
  }
  // matchs user with goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorizied')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedGoal)
})

// DESC   delete goal
// Route  DELETE /api/goals
// Access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  // check user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(403)
    throw new Error('User not found')
  }
  // matchs user with goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorizied')
  }
  await Goal.findByIdAndDelete(goal);
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal
}