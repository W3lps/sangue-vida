const Question = require('../models/question');

const checkStatusCode = require('../helpers/checkStatusCode');
const errorHandler = require('../helpers/errorHandler');
const inputValidator = require('../helpers/inputValidator');

const checkAuthLevel = userType => {
  if (userType !== 'admin') errorHandler(404, 'Usuário não autorizado');
};

exports.addQuestion = async (req, res, next) => {
  inputValidator({ req });
  checkAuthLevel(req.userType);

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

    res.status(201).json({ message: 'Pergunta criada', question: question });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.editQuestionPage = async (req, res, next) => {
  checkAuthLevel(req.userType);

  const questId = req.params.questId;
  if (!questId) errorHandler(404, 'Pergunta não encontrada!');
  try {
    const question = await Question.findById(questId);
    if (!question) errorHandler(404, 'Pergunta não encontrada');

    res.status(200).json({ question: question });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.finishedEditQuestion = async (req, res, next) => {
  checkAuthLevel(req.userType);
  inputValidator({ req });
  const questId = req.params.questId;
  if (!questId) errorHandler(404, 'Pergunta não encontrada!');

  const newQuestTxt = req.body.newQuestTxt;
  const newQuestGender = req.body.newQuestGender;
  const newOptions = req.body.newOptions;
  const newAnswer = req.body.newAnswer;
  const newFlwQuestions = req.body.followingQuestions || null;

  try {
    const question = await Question.findById(questId);
    if (!question) errorHandler(404, 'Pergunta não encontrada!');

    question.questionText = newQuestTxt;
    question.questionAssignedGender = newQuestGender;
    question.options = newOptions;
    question.correctAnswer = newAnswer;
    question.followingQuestions = newFlwQuestions;

    await question.save();

    res.status(200).json({ message: 'Editada.', question: question });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  checkAuthLevel(req.userType);
  const questId = req.params.questId;
  if (!questId) errorHandler(404, 'Pergunta não encontrada!');

  try {
    await Question.findByIdAndRemove(questId);
    res.status(200).json({ message: 'Pergunta excluída' });
  } catch (error) {
    checkStatusCode(err, next);
  }
};
