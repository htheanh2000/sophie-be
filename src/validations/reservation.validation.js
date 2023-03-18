const Joi = require('joi');
const { objectId } = require('./custom.validation');

const makeReservation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    size: Joi.string().required(),
    note: Joi.string().allow('', null),
    notification: Joi.boolean().required(),
  }),
};

module.exports = {
  makeReservation,
};
