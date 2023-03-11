const { Menu } = require('../models');
/**
 * Create a dish
 * @param {Object} dishBody
 * @returns {Promise<Dish>}
 */
const createDish = async (dishBody) => {
  return Menu.create(dishBody);
};

/**
 * Query for menu
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMenu = async (filter, options) => {
  const menu = await Menu.paginate(filter, options);
  return menu;
};

/**
 * Get dish by id
 * @param {ObjectId} id
 * @returns {Promise<Dish>}
 */
const getDishById = async (id) => {
  return Menu.findById(id);
};

/**
 * Get dish by name
 * @param {string} name
 * @returns {Promise<Dish>}
 */
const getDishByName = async (name) => {
  return Menu.findOne({ name });
};


module.exports = {
  queryMenu,
  createDish,
  getDishById,
  getDishByName
};
