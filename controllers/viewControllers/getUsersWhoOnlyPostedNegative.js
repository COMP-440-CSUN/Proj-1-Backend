const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getUsersWhoPostedNegativeOnly = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "SELECT DISTINCT `username` from `users` AS u WHERE 0 = (SELECT count(*) from `comments` AS c WHERE u.username = c.posted_by AND sentiment = 'Positive') AND u.username in (SELECT posted_by from comments)";
 
        const[rows] = await conn.execute(query);
       
        return res.status(201).json({
            message: "Users who have only posted negative comments are shown",
            rows: rows

        });
    
        
    } catch(err){
        next(err);
    }

}