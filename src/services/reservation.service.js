const { Reservation } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a reservation
 * @param {Object} reservationBody
 * @returns {Promise<Reservation>}
 */
const makeReservation = async (reservationBody) => {
  return Reservation.create(reservationBody);
};

module.exports = {
  makeReservation,
};
