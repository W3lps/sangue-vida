const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('../helpers/errorHandler');
const checkStatusCode = require('../helpers/checkStatusCode');
const inputValidator = require('../helpers/inputValidator');
const sendMail = require('../helpers/sendMail');

const emailContent = `
  Bem vindo(a) a iniciativa Sangue é Vida! 
  Faça o seu teste agora e ajude a nossa causa!
`;

exports.signup = async (req, res) => {
  inputValidator({ req });
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const userSex = req.body.userSex;
  const telephone = req.body.telephoneNumber;

  try {
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) errorHandler(404, 'E-mail já cadastrado');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      sex: userSex,
      userType: 'doador',
      telephoneNumber: telephone,
    });
    await user.save();
    sendMail(emailContent, 'Bem Vindo!', email);
    res.status(201).json({ message: 'Created', user: user._id });
  } catch (err) {
    checkStatusCode(err, next);
  }
};

exports.login = async (req, res, next) => {
  inputValidator({ req });
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) errorHandler(401, 'Usuário não encontrado!');
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) errorHandler(401, 'Senha inválida!');

    const jwtToken = jwt.sign(
      {
        email: user.email,
        userType: user.userType,
        userId: user._id,
      },
      'hashedSecret=WP',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: jwtToken });
  } catch (err) {
    checkStatusCode(err, next);
  }
};
