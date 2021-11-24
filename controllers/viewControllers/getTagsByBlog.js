const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.getTagsbyBlog = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        
        var initialQuery = "SELECT bt.tag from `blogstags` as bt where bt.blogID = ?";
        var values = [req.body.blogid];
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