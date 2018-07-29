const multer = require ('multer');
var multerS3 = require ('multer-s3');
var aws = require ('aws-sdk');

const config = {
  accessKeyId: process.env.AWS_SECRET_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
};



var s3 = new aws.S3 (config);
var upload = multer ({
  storage: multerS3 ({
    s3: s3,
    bucket: process.env.BUCKET,
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
// PRE avatar/
// PRE ingredients/
// PRE instructions/
// PRE lesson_title/
// PRE number_of_people/
// PRE time_to_prepare/
// PRE tools/
