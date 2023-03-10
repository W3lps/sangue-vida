const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  user: EMAIL_USER,
  pass: EMAIL_PASS,
};
