const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../helpers/isAuth');

router.put('/add-question', isAuth, [
  body('questTxt').trim().isLength({ min: 5 }),
  body('questGender').not().isEmpty(),
  body('options').not().isEmpty(),
  body('correctAnswer').not().isEmpty(),
  adminController.addQuestion,
]);

module.exports = router;
