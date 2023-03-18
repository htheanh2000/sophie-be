const express = require('express');
const validate = require('../../middlewares/validate');
const reservationController = require('../../controllers/reservation.controller');
const reservationValidation = require('../../validations/reservation.validation');

const router = express.Router();

router.route('/').post(validate(reservationValidation.makeReservation), reservationController.makeReservation);

module.exports = router;
