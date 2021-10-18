var mysql = require('mysql2')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andrew7299!',
    database: 'comp440'
}).on("error", (err)=> {
    console.log("failed to connect to Database - ", err);
});


module.exports = conn;