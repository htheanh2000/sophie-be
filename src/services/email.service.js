const nodemailer = require('nodemailer');
const path = require('path');
const config = require('../config/config');
const handlebars = require('handlebars');
const logger = require('../config/logger');
const fs = require('fs');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((e) =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env: \n', e)
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} template
 * @returns {Promise}
 */
const sendHtmlEmail = async (to, subject, template, data) => {
  const filename = path.join(__dirname, `../mail-templates/${template}/index.html`);
  fs.readFile(filename, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      logger.error(err);
    } else {
      const templatehandle = handlebars.compile(html);

      const mailOptions = {
        from: config.email.from,
        to,
        subject,
        html: templatehandle(data),
      };
      return transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          logger.error(error);
        } else {
          logger.debug(info.response);
        }
      });
    }
  });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${process.env.HOST}/reset-password?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${process.env.HOST}/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendReservationEmail = async (data) => {
  const { name, phone, email, date, time, size, note, occasions, notification } = data;
  const subject = 'Reservation';
  const template = 'reservation';
  // replace this url with the link to the email verification page of your front-end app
  await sendHtmlEmail(email, subject, template, data);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendMarketingEmail = async (data) => {
  const text = `
    ${data.message}
    From:
    name: ${data.name}
    email: ${data.email}
    phone: ${data.phone}
  `;
  await sendEmail(config.email.from, data.subject, text);
};

const sendContactEmail = async (data) => {
  const subject = 'We heard from you';
  const text = `
    Hi ${data.email},
    We received your message and will contact you soon.

    Best regards,
    Sophie Restaurant
  `;
  await sendEmail(data.email, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendReservationEmail,
  sendContactEmail,
  sendMarketingEmail,
};
