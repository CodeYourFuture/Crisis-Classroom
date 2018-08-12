const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const creatExperience = (req, res) => {
  const experience = req.body;
  saveExperience(experience)
    .then(() => res.json({ msg: "Success! Your experience has been saved." }))
    .catch(err =>
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      })
    );
};

const saveExperience = experience => {
  const {
    user_id,
    what_experience,
    what_date,
    what_place,
    with_whom_student,
    with_whom_teacher,
    about_experience
  } = experience;
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
            `insert into experience
            (
              user_id,
              what_experience,
              what_date,
              what_place,
              with_whom_student,
              with_whom_teacher,
              about_experience
            )
            values ($1, $2, $3, $4, $5, $6, $7)`,
            [
              user_id,
              what_experience,
              what_date,
              what_place,
              with_whom_student,
              with_whom_teacher,
              about_experience
            ]
          )
          .then(result => {
            if (result.rowCount == 1) {
              return resolve();
            } else
              return reject({
                msg:
                  "Ops! Sorry something happened on the server, please try again later."
              });
          });
        done();
      }
    );
  });
};

module.exports = creatExperience;
