const mongoose = require('mongoose')

const goalShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    text: {
      type: String,
      require: [true, 'Please add text value']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Goal', goalShema)