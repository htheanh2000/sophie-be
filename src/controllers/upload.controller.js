const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const catchAsync = require('../utils/catchAsync');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = catchAsync(async (req, res) => {
  const { file } = req; // assuming you're using middleware to handle file uploads
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${uuidv4()}.png`,
    Body: file.buffer,
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      res.status(500).send({
        error: err.message,
        message: 'Error uploading file !',
      });
    } else {
      res.send({
        message: 'File uploaded successfully !',
        data: data.key,
      });
    }
  });
});


const uploadPdf = catchAsync(async (req, res) => {
  const { file } = req; // assuming you're using middleware to handle file uploads
  console.log('process.env.BUCKET_NAME', process.env.BUCKET_NAME)
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${uuidv4()}.pdf`,
    Body: file.buffer,
    ContentDisposition: "inline",
    ContentType: "application/pdf"
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      res.status(500).send({
        error: err.message,
        message: 'Error uploading file !',
      });
    } else {
      res.send({
        message: 'File uploaded successfully !',
        data: data.Key,
      });
    }
  });
});


module.exports = {
  upload,
  uploadPdf
};
