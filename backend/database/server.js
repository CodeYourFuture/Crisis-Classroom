const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
var fs = require("fs");
var crisisdb = fs.readFileSync("./crisis.sql").toString()
const client = new pg.Client(connectionString);
client.connect();
query = client.query(crisisdb);
query.on('end', () => { client.end(); });