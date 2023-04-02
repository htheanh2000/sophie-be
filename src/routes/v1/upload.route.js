const express = require('express');
const multer = require('multer');
const uploadController = require('../../controllers/upload.controller');
const auth = require('../../middlewares/auth');
const storage = multer.memoryStorage();

const upload = multer({ dest: 'uploads/', storage });
const router = express.Router();

router.route('/').post(upload.single('file'), uploadController.upload);

router.route('/pdf').post(upload.single('file'), uploadController.uploadPdf);

module.exports = router;
