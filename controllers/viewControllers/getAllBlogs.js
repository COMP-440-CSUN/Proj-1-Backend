const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getAllBlogs = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        
        var initialQuery = "SELECT * from blogs";
        const[rows] = await conn.execute(initialQuery);
        return res.status(201).json({
            rows
        })
    } catch(err){
        next(err);
    }
    

}