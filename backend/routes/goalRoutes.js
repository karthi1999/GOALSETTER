const express = require('express')
const { getGoal, setGoal, updateGoal, deleteGoal } = require('../contollers/getContollers')
const router = express.Router()

router.route('/').get(getGoal).post(setGoal)

// router.get('/', getGoal)
// router.post('/', setGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)
module.exports = router