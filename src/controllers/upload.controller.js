const catchAsync = require('../utils/catchAsync');

const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');



const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

});

const upload = catchAsync(async (req, res) => {

    const file = req.file; // assuming you're using middleware to handle file uploads
    console.log('Uploading', file)
    const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: uuidv4() + '.png',
        Body: file.buffer
    };

    s3.upload(s3Params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                error: err.message,
                message: 'Error uploading file !'
            });
        } else {
            console.log(`File uploaded to ${data.Location}`);
            res.send({
                message: 'File uploaded successfully !',
                data: data.key
            });
        }
    });
});


module.exports = {
    upload
};
