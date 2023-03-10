const smtpData = require('./smtp');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: smtpData.host,
  port: smtpData.port,
  secure: false,
  auth: {
    user: smtpData.user,
    pass: smtpData.pass,
  },
  tls: { rejectUnauthorized: false },
});

module.exports = async (emailTxt, subject, to) => {
  return await transporter.sendMail({
    text: emailTxt,
    subject: subject,
    from: 'Sangue é vida! <sangueevidaproj@gmail.com',
    to: to,
  });
};
