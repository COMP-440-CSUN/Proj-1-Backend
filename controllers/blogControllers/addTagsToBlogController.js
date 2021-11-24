const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.addTags = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        var insertTag = "INSERT INTO `blogstags` (`blogid`, `tag`) VALUES (?,?)"
        var values = [req.body.blogid, req.body.tag]

        const[insertTags] = await conn.execute(
            insertTag,
            values
        );
        return res.status(201).json({
            message: "Tag was inserted succesfully"
        })
    } catch(err){
        next(err);
    }

}