const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getUsersWhoPostedOnSameDate = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "SELECT `created_by`, `creation_date`, count(*) as blogCount from `blogs` where `creation_date` = '21/10/10' group by `created_by`,`creation_date` order by count(`creation_date`) DESC";
        //need to targed "blogCount" in front end to query
 
        const[rows] = await conn.execute(query);
       
        return res.status(201).json({
            message: "Users who posted the most on a certain day shown",
            rows: rows

        });
    
        
    } catch(err){
        next(err);
    }

}