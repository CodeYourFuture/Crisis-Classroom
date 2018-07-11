const files = (req, res) => {
  return res.status (200).json ({image: req.file.location});
};
module.exports = files;
