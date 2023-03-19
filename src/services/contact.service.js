const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a reservation
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const contact = async (contactBody) => {
  return Contact.create(contactBody);
};

module.exports = {
  contact,
};
