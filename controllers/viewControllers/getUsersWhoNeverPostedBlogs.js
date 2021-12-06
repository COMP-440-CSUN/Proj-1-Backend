const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getUsersWhoNeverPostedBlogs = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "SELECT `username` FROM `users` WHERE `username` NOT IN (select `created_by` from blogs)";
 
        const[rows] = await conn.execute(query);
       
        return res.status(201).json({
            message: "Users who have never posted a blog are shown",
            rows: rows

        });
    
        
    } catch(err){
        next(err);
    }

}