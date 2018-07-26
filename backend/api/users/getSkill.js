const getSkills = require('../../helpers/getSkills');

const UserProfile = (req, res) => {
  const { id } = req.body;
  getSkills(id)
    .then((skill) => res.json(skill))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};



module.exports = UserProfile;
