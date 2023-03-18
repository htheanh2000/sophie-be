const express = require('express');
const validate = require('../../middlewares/validate');
const menuValidation = require('../../validations/menu.validation');
const menuController = require('../../controllers/menu.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(menuValidation.getMenu), menuController.getMenu)
  .post(validate(menuValidation.createDish), menuController.createDish);

router.route('/:dishId').get(validate(menuValidation.getDish), menuController.getDish).delete(menuController.deleteDish);

module.exports = router;
