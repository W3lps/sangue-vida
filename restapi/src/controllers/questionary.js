const Question = require('../models/question');
const Questionary = require('../models/questionary');
const User = require('../models/user');

const checkStatusCode = require('../helpers/checkStatusCode');
const errorHandler = require('../helpers/errorHandler');
const sendMail = require('../helpers/sendMail');

const emailContent = `
  Você está apto a doar sangue! Venha até nossa unidade e salve vidas!
  R. Não Existente 9999, Centro - Pindamonhangaba SP 13030-30.
`;

exports.getQuestionary = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const questionary = await Question.find({
      questionAssignedGender: user.sex,
    });

    res.status(200).json({
      messaged: 'Questionario formado com sucesso!',
      questionary: questionary,
    });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.finishedQuestionary = async (req, res, next) => {
  const userId = req.userId;
  const userEmail = req.userEmail;
  //expects an array of wrong answers with question Id and wrong answer
  const wrongAnswers = req.body.wrongAnswers || null;

  try {
    const user = await User.findById(userId);
    const questionary = new Questionary({
      userId: userId,
      wrongAnswers: wrongAnswers,
    });
    await questionary.save();
    if (!wrongAnswers) sendMail(emailContent, 'Parabéns!', userEmail);
    res.status(200).json({
      message: 'Questionário finalizado!',
      questionary: questionary._id,
    });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.seeQuestionaries = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  let queryFilter;
  user.userType === 'doador'
    ? (queryFilter = { userId: user._id })
    : (queryFilter = {});

  const questionaries = await Questionary.find(queryFilter)
    .populate('userId')
    .populate('wrongAnswers.questionId');

  res.status(200).json({ questionaries: questionaries });
};

exports.seeOneQuestionary = async (req, res, next) => {
  const questionaryId = req.params.questionaryId;

  try {
    const questionary = await Questionary.findById(questionaryId)
      .populate('userId')
      .populate('wrongAnswers.questionId');

    if (!questionary) errorHandler(404, 'Questionário não encontrado!');
    if (questionary.userId !== req.userId && req.userType !== 'admin')
      errorHandler(403, 'Usuário não autorizado!');

    res.status(200).json({ questionary: questionary });
  } catch (err) {
    checkStatusCode(err, next);
  }
};
