const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuService } = require('../services');

const getMenu = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await menuService.queryMenu(filter, options);
  res.send(result);
});

const createDish = catchAsync(async (req, res) => {
  const dish = await menuService.createDish(req.body);
  res.status(httpStatus.CREATED).send(dish);
});

const getDish = catchAsync(async (req, res) => {
  const dish = await menuService.getDishById(req.params.dishId);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dish not found');
  }
  res.send(dish);
});

const deleteDish = catchAsync(async (req, res) => {
  const dish = await menuService.deleteDishById(req.params.dishId);
  res.send(dish);
});

module.exports = {
  getMenu,
  createDish,
  getDish,
  deleteDish,
};
