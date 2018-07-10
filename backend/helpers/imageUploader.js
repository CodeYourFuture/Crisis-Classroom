const multer = require ('multer');

const config = {
  accessKeyId: process.env.AWS_SECRET_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
};

var multerS3 = require ('multer-s3');
var aws = require ('aws-sdk');

var s3 = new aws.S3 (config);
var upload = multer ({
  storage: multerS3 ({
    s3: s3,
    bucket: 'crisis-class-room',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb (null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb (null, Date.now ().toString ()+".jpg");
    },
  }),
});

module.exports = upload;