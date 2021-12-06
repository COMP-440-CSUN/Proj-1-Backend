const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getAllBlogsWithPositiveCommentsOnly = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "select distinct b.blogID, b.subject, b.description, b.creation_date, b.created_by from `blogs` as b, `comments` as c where  0 = (select count(*) from `comments` as c where c.blogID = b.blogID and c.sentiment = 'Negative') and c.blogID = b.blogID;";
        //need to targed "blogCount" in front end to query
 
        const[rows] = await conn.execute(query);
       
        return res.status(201).json({
            message: "users with positive comments only is now shown",
            rows: rows

        });
    
        
    } catch(err){
        next(err);
    }

}