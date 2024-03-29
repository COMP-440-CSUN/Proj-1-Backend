const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../../database').promise();

exports.register = async( req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try{
        var query = "SELECT `email` FROM `users` WHERE `email`=?";
        const[row] = await conn.execute(
            query,
            [req.body.email]
        );

        if(row.length > 0){
            return res.status(201).json({
                message: "The e-mail entered is already in use",
            });
        }
        var insert = 'INSERT INTO `users`(`fName`,`lName`,`email`,`password`,`username`) VALUES(?,?,?,?,?)';
        const hashPass = await bcrypt.hash(req.body.password, 12);
        const [rows] = await conn.execute(insert,[
            req.body.fName,
            req.body.lName,
            req.body.email,
            hashPass,
            req.body.username
        ]);

        if(rows.affectedRows === 1){
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }

    }catch(err){
        next(err);
    }
}