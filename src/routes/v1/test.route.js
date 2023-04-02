const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const testValidation = require('../../validations/test.validation');
const testController = require('../../controllers/test.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(testValidation.createTest), testController.createTest)
  .get( validate(testValidation.getTests), testController.getTests);

router
  .route('/:testId')
  .get(validate(testValidation.getTest), testController.getTest)
  .patch(validate(testValidation.updateTest), testController.updateTest)
  .delete(validate(testValidation.deleteTest), testController.deleteTest);

module.exports = router;
