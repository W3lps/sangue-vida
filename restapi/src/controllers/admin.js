const checkStatusCode = require('../helpers/checkStatusCode');
const errorHandler = require('../helpers/errorHandler');
const inputValidator = require('../helpers/inputValidator');
const Question = require('../models/question');

exports.addQuestion = async (req, res, next) => {
  inputValidator({ req });
  const questTxt = req.body.questTxt;
  const questGender = req.body.questGender;
  const options = req.body.options;
  const correctAnswer = req.body.correctAnswer;
  const followingQuestions = req.body.followingQuestions || null;

  try {
    const checkQuestion = await Question.findOne({ questionText: questTxt });
    if (checkQuestion) errorHandler(404, 'Pergunta já existente');

    const question = new Question({
      questionText: questTxt,
      questionAssignedGender: questGender,
      options: options,
      correctAnswer: correctAnswer,
      followingQuestions: followingQuestions,
    });
    await question.save();

    res.status(201).json({ message: 'Question created', question: question });
  } catch (err) {
    checkStatusCode(err, next);
  }
};
