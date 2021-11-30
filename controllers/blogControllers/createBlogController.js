const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.createBlog = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        
        var initialQuery = "SELECT COUNT(*) as blogCount from `blogs` where `created_by` = ? and `creation_date` = curdate();";
        var values = [req.body.username];

        const[initialRows] = await conn.execute(
            initialQuery,
            values
        );
        var rowCount = initialRows[0].blogCount;

        if(rowCount <= 1){
            var insert = 'INSERT INTO  `blogs` (`subject`,`description`,`creation_date`,`created_by`) VALUE (?,?,CURDATE(),?)';
            var insertValues = [
                req.body.subject,
                req.body.description,
                req.body.username
            ]
           
            const[finalInsert] = await conn.execute(
                insert,
                insertValues
            )
            console.log(finalInsert.insertId);
            return res.status(201).json({
                blogId: finalInsert.insertId
            });
        }
        else{
            return res.status(201).json({
                message: "you are over your daily blog post limit. Try again tomorrow",
            });
        }

        

    } catch(err){
        next(err);
    }

}
