const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const removeIngredient = (req, res) => {
  pg.connect(
    connectionString,
    (err, client, done) => {
      if (err) {
        return res.status(400).json({ err });
      }
      client
        .query(`DELETE FROM ingredients where id=$1`, [req.body.id])
        .then(result => {
          return res.json({ msg:"instruction has been deleted." });
        });
      done();
    }
  );
};

module.exports = removeIngredient;
