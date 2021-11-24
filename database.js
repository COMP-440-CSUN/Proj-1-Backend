require('dotenv').config()
var mysql = require('mysql2')
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
}).on("error", (err)=> {
    console.log("failed to connect to Database - ", err);
});


module.exports = conn;
