const getExperiences = require('../../helpers/getExperiences');

const UserProfileExperiences = (req, res) => {
  const { id } = req.body;
  getExperiences(id)
    .then((experience) => res.json(experience))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};



module.exports = UserProfileExperiences;