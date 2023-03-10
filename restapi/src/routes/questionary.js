const express = require('express');

const router = express.Router();

const questionaryController = require('../controllers/questionary');
const isAuth = require('../helpers/isAuth');

router.get('/questionary', isAuth, questionaryController.getQuestionary);

router.post('/questionary', isAuth, questionaryController.finishedQuestionary);

router.get(
  '/see-questionary/:questionaryId',
  isAuth,
  questionaryController.seeOneQuestionary
);

router.get(
  '/see-questionaries',
  isAuth,
  questionaryController.seeQuestionaries
);

module.exports = router;
