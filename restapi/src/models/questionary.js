const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionarySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  wrongAnswers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question',
      },
      selectedAnswer: {
        type: String,
        required: true,
      },
    },
  ],
  questionaryDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Questionary', questionarySchema);
