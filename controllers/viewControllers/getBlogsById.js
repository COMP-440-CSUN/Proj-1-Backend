const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getBlogByID = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var initialQuery = "SELECT * FROM `blogs` as b WHERE b.blogID = ?";
        var values = [req.body.blogID];
        const[rows] = await conn.execute(
            initialQuery,
            values
        )
        if(rows.length === 0){
            return res.status(201).json({
                message: "Blog does not exist"
            });
        } else{
            return res.status(201).json({
                rows
            });
        }
        
    
    } catch(err){
        next(err);
    }

}