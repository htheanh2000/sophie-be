const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTest = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    owner: Joi.string().required().custom(objectId),
    question: Joi.string().required(),
    subject: Joi.string().required(),
    duration: Joi.number().required(),
    correctAnswer: Joi.array().required()
  }),
};

const getTests = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTest = {
  params: Joi.object().keys({
    testId: Joi.string().custom(objectId),
  }),
};

const updateTest = {
  params: Joi.object().keys({
    testId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      owner: Joi.string().custom(objectId),
      question: Joi.string(),
      subject: Joi.string(),
      duration: Joi.number(),
      correctAnswer: Joi.array()
    })
    .min(1),
};

const deleteTest = {
  params: Joi.object().keys({
    testId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTest,
  getTests,
  getTest,
  updateTest,
  deleteTest,
};
