const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const getSkills = require("../../helpers/getSkills");
const getExperiences = require("../../helpers/getExperiences");

const teachers = (req, res) => {
  getTeachers()
    .then(teachers =>
      Promise.all(teachers.map(teacher => getTeacherData(teacher)))
    )
    .then(teachersPlusData => res.json(teachersPlusData))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getTeacherData = teacher => {
  const user_id = teacher.id;
  return Promise.all([getSkills(user_id), getExperiences(user_id)]).then(
    ([skills, experiences]) => {
      return {
        ...teacher,
        skills,
        experiences
      };
    }
  );
};
const getTeachers = () => {
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
        client.query(`select title, first_name, sur_name, email, avatar, about_user from users`).then(result => {
          const data = result.rows;
          return resolve(data);
        });
        done();
      }
    );
  });
};

module.exports = teachers;
