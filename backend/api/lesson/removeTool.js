const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const removeTool = (req, res) => {
  pg.connect(
    connectionString,
    (err, client, done) => {
      if (err) {
        return res.status(400).json({ err });
      }
      client
        .query(`DELETE FROM tools where id=$1`, [req.body.id])
        .then(result => {
          return res.json({ msg:"tool has been deleted." });
        });
      done();
    }
  );
};

module.exports = removeTool;
