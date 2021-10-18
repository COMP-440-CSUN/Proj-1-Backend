var mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andrew7299!',
    database: 'comp440'
})

conn.connect(function(err) {
    if(err) throw err;
    console.log('Database is connectesd successfully!');
});
module.exports = conn;