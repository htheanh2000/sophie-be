const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const multer  = require('multer')
const storage = multer.memoryStorage()

const upload = multer({ dest: 'uploads/' , storage: storage})
const router = express.Router();

router
  .route('/')
  .post(upload.single('file'),uploadController.upload)


module.exports = router;