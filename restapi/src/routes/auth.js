const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const authController = require('../controllers/auth');

router.put(
  '/signup',
  [
    body('firstName').not().isEmpty().trim(),
    body('lastName').not().isEmpty().trim(),
    body('email').isEmail().trim(),
    body('password').isLength({ min: 8 }),
    body('userSex').not().isEmpty(),
  ],
  authController.signup
);
router.post(
  '/login',
  [body('email').isEmail().trim(), body('password').isLength({ min: 8 })],
  authController.login
);

module.exports = router;