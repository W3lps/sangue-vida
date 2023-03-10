const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('firstName').not().isEmpty().trim(),
    body('lastName').not().isEmpty().trim(),
    body('email').isEmail().trim(),
    body('password').isLength({ min: 8 }),
    body('userSex').not().isEmpty(),
    body('telephoneNumber').isLength({ min: 13, max: 13 }).isNumeric(),
  ],
  authController.signup
);
router.post(
  '/login',
  [body('email').isEmail().trim(), body('password').isLength({ min: 8 })],
  authController.login
);

module.exports = router;
