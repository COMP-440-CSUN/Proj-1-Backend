const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getBlogByUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var initialQuery = "SELECT * from `blogs` as b where b.created_by = ?";
        var values = [req.body.username];
        const[rows] = await conn.execute(
            initialQuery,
            values

        );
        
            return res.status(201).json({
                rows
            });
       
    } catch(err){
        next(err);
    }
}