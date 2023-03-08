const { validationResult } = require('express-validator/check');
const errorHandler = require('../helpers/errorHandler');
module.exports = ({ req }) => {
  if (!validationResult(req).isEmpty())
    return errorHandler(422, 'Dados incorretos! Reveja os inputs');
};
