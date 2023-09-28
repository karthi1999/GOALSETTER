const express = require('express')
const { getGoal, setGoal, updateGoal, deleteGoal } = require('../contollers/getContollers')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoal).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// Handle routes without an id parameter
router.use((req, res, next) => {
  res.status(404).json({ error: 'url not found' });
});

module.exports = router