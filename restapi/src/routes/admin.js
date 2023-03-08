const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../helpers/isAuth');

router.post('/add-question', isAuth, [
  body('questTxt').trim().isLength({ min: 5 }),
  body('questGender').not().isEmpty(),
  body('options').not().isEmpty(),
  body('correctAnswer').not().isEmpty(),
  adminController.addQuestion,
]);

router.get('/edit-question/:questId', isAuth, adminController.editQuestionPage);

router.put('/edit-question/:questId', isAuth, [
  body('newQuestTxt').trim().isLength({ min: 5 }),
  body('newQuestGender').not().isEmpty(),
  body('newOptions').not().isEmpty(),
  body('newAnswer').not().isEmpty(),
  adminController.finishedEditQuestion,
]);

router.delete(
  '/delete-question/:questId',
  isAuth,
  adminController.deleteQuestion
);

module.exports = router;
