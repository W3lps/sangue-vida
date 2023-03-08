const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionAssignedGender: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  followingQuestions: [
    {
      flwQuestText: {
        type: String,
      },
      flwOptions: [
        {
          type: String,
          required: true,
        },
      ],
      flwQuestAnswer: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
