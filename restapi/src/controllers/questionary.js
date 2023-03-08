const Question = require('../models/question');
const Questionary = require('../models/questionary');
const User = require('../models/user');

const checkStatusCode = require('../helpers/checkStatusCode');

exports.getQuestionary = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const questionary = await Question.find({
      questionAssignedGender: user.sex,
    });

    res.status(200).json({
      messaged: 'Fetched all questions for the current user',
      questionary: questionary,
    });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.finishedQuestionary = async (req, res, next) => {
  const userId = req.userId;
  //expects an array of wrong answers with question Id and wrong answer
  const wrongAnswers = req.body.wrongAnswers || null;

  try {
    const questionary = new Questionary({
      userId: userId,
      wrongAnswers: wrongAnswers,
    });
    await questionary.save();

    res.status(200).json({
      message: 'Questionário finalizado!',
      questionary: questionary._id,
    });
  } catch (err) {
    checkStatusCode(err, next);
  }
};
