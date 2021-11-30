const conn = require('../../database').promise();
const {validationResult} = require('express-validator');

exports.createComment = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try{
        if(req.body.blogPoster == req.body.posted_by){
            return res.status(201).json({
                message: "You cannot post a comment on your own blog",
            });
        }
        //var findCommentsOfBlogId = 'SELECT COUNT(*) as blogCount from `comments` JOIN `blogs` where `comments.blogID` = ?'
        //finds all comments of the blog from the current day and relate to the blog
        //checks to see if user can post a comment based on if they already posted 3 comments on that day
        var findCommentsOfBlogId = 'SELECT COUNT(*) as commentCount from `comments` as c where c.creation_date = curDate() and c.posted_by = ?';
        var values = [req.body.posted_by];
        const[comments] =  await conn.execute(
            findCommentsOfBlogId,
            values
        );
        var numberOfComments = comments[0].commentCount;
        if(numberOfComments <= 2){
            console.log("hit");
            //checks to see if user is not trying to post on their own blog
            //if in here, the user can post a comment, if they already had not posted the comment
            values = [req.body.blogID,req.body.posted_by, req.body.blogPoster];
            var commentOnBlog = 'SELECT COUNT(*) as commentCount FROM `comments` AS c, `blogs` as b WHERE c.blogID = ? AND c.posted_by = ? AND b.created_by = ?';
            const[totalCommentsOnBlog] =  await conn.execute(
                commentOnBlog,
                values
            );
            console.log(totalCommentsOnBlog[0].commentCount);
            //if user has not posted a comment on the blog, they can post
            if(totalCommentsOnBlog[0].commentCount === 0){
                var insert = 'INSERT INTO `comments` (`sentiment`, `description`, `creation_date`, `blogID`,`posted_by`) VALUES (?,?,CURDATE(), ?, ?)';
                var insertValues = [
                    req.body.sentiment,
                    req.body.description,
                    req.body.blogID,
                    req.body.posted_by,
                ];
                const[finalInsert] = await conn.execute(
                    insert,
                    insertValues
                );
                console.log("Posted");
                console.log(finalInsert);
                return res.status(201).json({
                    message: "Comment successfully inserted",
                });
                
            }
            else{
                return res.status(201).json({
                    message: "You have already posted a comment on this blog"
                })
            }

        } else{
            //if in here, the user has already posted 3 comments, therefore, they cannot post another comment
            return res.status(201).json({
                message: "You can only post 3 comments per day"
            })
        }
    } catch(err){
        next(err);
    }

}
