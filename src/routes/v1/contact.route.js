const express = require('express');
const validate = require('../../middlewares/validate');
const contactController = require('../../controllers/contact.controller');
const contactValidation = require('../../validations/contact.validation');

const router = express.Router();

router.route('/').post(validate(contactValidation.contact), contactController.contact);

module.exports = router;
