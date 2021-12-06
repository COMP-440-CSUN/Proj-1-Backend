const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getPositiveBlogsByUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "SELECT * FROM `blogs` as b where 0 = (SELECT COUNT(*) from `comments` as c where c.blogID = b.blogID and c.sentiment = 'Negative') and b.created_by = ?";
        var values = [req.body.username];
        const[rows] = await conn.execute(query, values);
       
        return res.status(201).json({
            message: "All blogs with positive comments only for the user are shown",
            rows: rows

        });
    
        
    } catch(err){
        next(err);
    }

}