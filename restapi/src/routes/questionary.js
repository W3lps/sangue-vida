const express = require('express');

const router = express.Router();

const questionaryController = require('../controllers/questionary');
const isAuth = require('../helpers/isAuth');

router.get('/questionary', isAuth, questionaryController.getQuestionary);

router.post(
  '/finished-questionary',
  isAuth,
  questionaryController.finishedQuestionary
);

module.exports = router;
