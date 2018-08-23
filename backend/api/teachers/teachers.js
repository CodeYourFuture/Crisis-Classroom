const pg = require("pg");

const connectionString = process.env.DATABASE_URL;


const teachers = (req, res) => {
  const { id } = req.body;
  getAllTeachers(id)
    .then(teachers =>
      Promise.all(teachers.data.map(teacher => getTeacherData(teacher)))
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

const getAllTeachers = id => {
  if (id) {
    return Promise.all([getTeacher(id)]).then(([data]) => {
      return {
        data
      };
    });
  }
  if (!id) {
    return Promise.all([getTeachers()]).then(([data]) => {
      return {
        data
      };
    });
  }
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
        client
          .query(
            `select id, title, first_name, sur_name, email, avatar, about_user from users`
          )
          .then(result => {
            const data = result.rows;
            return resolve(data);
          });
        done();
      }
    );
  });
};
const getTeacher = id => {
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
            `select id, title, first_name, sur_name, email, avatar, about_user from users where id=$1`,
            [id]
          )
          .then(result => {
            const data = result.rows;
            return resolve(data);
          });
        done();
      }
    );
  });
};
getSkills = (iuser_id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`select * from skills where user_id=$1`, [iuser_id])
        .then((result) => {
          if (result) {
            const skills = result.rows;
            return resolve(skills);
          } else return reject();
        });
        done()
    });
  });
};
getExperiences = (iuser_id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`select * from experience where user_id=$1`, [iuser_id])
        .then((result) => {
          if (result) {
            const experiences = result.rows;
            return resolve(experiences);
          } else return reject();
        });
        done()
    });
  });
};

module.exports = teachers;
