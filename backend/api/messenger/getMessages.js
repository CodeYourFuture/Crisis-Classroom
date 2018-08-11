const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const Messages = (req, res) => {
  getMessages(req.body)
    .then(messages => res.json(messages))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getMessages = userIds => {
  return Promise.all([
    getUserMessages(userIds),
    getToUserMessages(userIds)
  ]).then(([userMessages, toUserMessages]) => {
    return {
      userMessages,
      toUserMessages
    };
  });
};

const getUserMessages = userIds => {
  const { userId, toUserId } = userIds;
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
            `select * from crisis_messenger where user_id=$1 and to_user_id=$2`,
            [userId, toUserId]
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
const getToUserMessages = userIds => {
  const { userId, toUserId } = userIds;
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
            `select * from crisis_messenger where user_id=$1 and to_user_id=$2`,
            [toUserId, userId]
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

module.exports = Messages;
