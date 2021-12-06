const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.followUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var values = [req.body.leader_name, req.body.follower_name];
        if(req.body.leader_name == req.body.follower_name){
            return res.status(201).json({
                message: "You cannot follow yourself",
            });
        }

        //check if user already follows the leader
        var checkFollowedBy = "SELECT COUNT(*) as followCount from `follows` where `leader_name` = ? and `follower_name` = ? "
        const[countRows] = await conn.execute(
            checkFollowedBy,
            values
        )
        console.log(countRows[0].followCount );
        if(countRows[0].followCount != 0){
            return res.status(201).json({
                message: "You are already following this person",
            });
        }
        else{

            var follow = "INSERT INTO `follows` (`leader_name`, `follower_name`) VALUES (?,?)";

            const[rows] = await conn.execute(
                follow,
                values
            );
    
            return res.status(201).json({
                message: "User follow process successfull",
                rows: rows
    
            });
        }

        
    } catch(err){
        next(err);
    }

}