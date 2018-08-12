const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const editExperience = (req, res) => {
  const experiance = req.body;
  setExperience(experiance)
    .then(() => res.json({ msg: "Success! Your experiance has been changed." }))
    .catch(err =>
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      })
    );
};

const setExperience = experiance => {
  const {
    id,
    what_experience,
    what_date,
    what_place,
    with_whom_student,
    with_whom_teacher,
    about_experience
  } = experiance;
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Ops! Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(
            `update experience set    
            what_experience=$1,
            what_date=$2,
            what_place=$3,
            with_whom_student=$4,
            with_whom_teacher=$5,
            about_experience=$6
            where id=$7`,
            [
              what_experience,
              what_date,
              what_place,
              with_whom_student,
              with_whom_teacher,
              about_experience,
              id
            ]
          )
          .then(result => {
            if (result.rowCount == 1) {
              return resolve();
            } else
              return reject({
                err,
                msg:
                  "Ops! Sorry something happened on the server, please try again later."
              });
          });
        done();
      }
    );
  });
};

module.exports = editExperience;
