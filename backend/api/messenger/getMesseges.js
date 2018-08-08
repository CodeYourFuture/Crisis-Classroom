const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const Messeges = (req, res) => {
  getMesseges(req.body)
    .then(messeges => res.json(messeges))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getMesseges = userIds => {
  return Promise.all([
    getSenderMesseges(userIds),
    getReceiverMesseges(userIds)
  ]).then(([senderMesseges, receiverMesseges]) => {
    return {
      senderMesseges,
      receiverMesseges
    };
  });
};

const getSenderMesseges = userIds => {
  const { senderId, receiverId } = userIds;
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
            `select * from crisi_messenger where sender_id=$1 and receiver_id=$2`,
            [senderId, receiverId]
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
const getReceiverMesseges = userIds => {
  const { senderId, receiverId } = userIds;
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
            `select * from crisi_messenger where sender_id=$1 and receiver_id=$2`,
            [receiverId, senderId]
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

module.exports = Messeges;
