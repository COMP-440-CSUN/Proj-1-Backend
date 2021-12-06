const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getSameFollowers = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var query = "SELECT `leader_name` from `follows` as a where `leader_name` in (select `leader_name` from `follows` as b where a.leader_name = b.leader_name and `follower_name` = ?) and `follower_name` = ?";
        var values = [req.body.follower_one, req.body.follower_two];
        const[rows] = await conn.execute(query, values);
        if(rows.length === 0){
            return res.status(201).json({
                message: "The users do not share any followers",
            });
        } else{
            return res.status(201).json({
                message: "Followed users shown",
                rows: rows
    
            });
        }
        
        
    } catch(err){
        next(err);
    }

}