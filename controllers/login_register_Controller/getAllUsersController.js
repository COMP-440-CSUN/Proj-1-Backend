const conn = require('../../database').promise();

exports.getAllUsers = async(req, res, next) => {
    try{
        const[rows] = await conn.query('SELECT * FROM `users`');
        return res.json(rows);
    } catch(err) {
        return err;
    }
}