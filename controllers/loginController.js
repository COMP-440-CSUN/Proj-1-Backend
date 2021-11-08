const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../database').promise();

exports.login = async (req, res, next) =>{
    console.log("Login Successful");
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        //Using placeholders to prevent sql injection
        var query = "SELECT * FROM `users` WHERE `email`=?";
        var values = [req.body.email];
        console.log(values);
        const [row] = await conn.execute(
            query,
            values
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
        
        return res.json({
            token:theToken,
            message: "Login Successful"
        });
        

    }
    catch(err){
        next(err);
    }
}