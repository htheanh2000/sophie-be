const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDish = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    url: Joi.string().required(),
  }),
};

const getMenu = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDish = {
  params: Joi.object().keys({
    dishId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDish,
  getMenu,
  getDish,
};
