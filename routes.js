const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/login_register_Controller/registerController');
const {login} = require('./controllers/login_register_Controller/loginController');
const {getAllUsers} = require('./controllers/login_register_Controller/getAllUsersController');
const {initializeDatabase} = require('./controllers/login_register_Controller/initializeDatabaseController');
const {createBlog} = require('./controllers/blogControllers/createBlogController');
const {createComment} = require('./controllers/blogControllers/createCommentController');
const {postTag, addTags} = require("./controllers/blogControllers/addTagsToBlogController");
const {getAllBlogs} = require("./controllers/viewControllers/getAllBlogs");
var cors = require('cors');
const { ResultWithContext } = require('express-validator/src/chain');
const { getTagsbyBlog } = require('./controllers/viewControllers/getTagsByBlog');
const { getCommentsbyBlog } = require('./controllers/viewControllers/getCommentsByBlogs');
const { getBlogByUser } = require('./controllers/viewControllers/getBlogsPostedByUser');
const { getBlogByID } = require('./controllers/viewControllers/getBlogsById');
const { followUser } = require('./controllers/followerController/followUser');
const { getSameFollowers } = require('./controllers/viewControllers/getSameFollowers');
const { getUsersWhoNeverPostedBlogs } = require('./controllers/viewControllers/getUsersWhoNeverPostedBlogs');
const { getUsersWhoPostedOnSameDate } = require('./controllers/viewControllers/getUsersPostedOnDate');
const { getPositiveBlogsByUser } = require('./controllers/viewControllers/getPositiveBlogsByUser');
const { getAllBlogsWithPositiveCommentsOnly } = require('./controllers/viewControllers/getAllBlogsWithPostitiveCommentsOnly');
const { getUsersWhoPostedNegativeOnly } = require('./controllers/viewControllers/getUsersWhoOnlyPostedNegative');

router.use(cors());

router.post('/register', [
    body('fName',"The name must be a minimum of 3 characters")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 3}),
    body('lName',"The name must be a minimum of 3 characters")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 3}),
    body('username',"The username must be a minimum of 3 characters")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 3}),
    body('email',"Invalid Email Address")
    .notEmpty().
    escape()
    .trim()
    .isEmail(),
    body('password', "The password must be a minimum of 8 characters")
    .notEmpty()
    .trim()
    .isLength({min: 8}),
], register);

router.post('/login',[
    body('email', "Invalid email")
    .notEmpty()
    .escape()
    .trim(),
    body('password',"The Password must be of min 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
], login);

router.post('/postBlog',[
    body('description', "Please enter a description")
    .notEmpty()
    .escape()
    .trim(),
    body('subject',"The subject cannot be empty") 
    .notEmpty()
    .escape()
    .trim(),
    body('username',"The username cannot be empty") 
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 4 }),
], createBlog);

router.post('/postComment',[
    body('sentiment', "Please enter a description")
    .notEmpty()
    .escape()
    .trim(),
    body('description',"The subject cannot be empty") 
    .notEmpty()
    .escape()
    .trim(),
    body('posted_by',"The username cannot be empty") 
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 4 }),
    body('blogID',"The blogID must have a value"),
    body('blogPoster', "this field cannot be empty")
    .notEmpty()
    .escape()
    .trim()
],createComment)

router.post('/addTag', [
    body('blogid', "Please enter blog id")
    .notEmpty()
    .escape()
    .trim(),
    body('tag', 'enter tag')
    .notEmpty()
    .escape()
    .trim()
], addTags)

router.post('/getTagsbyBlogID', [
    body('blogid', "Please enter blog id")
    .notEmpty()
    .escape()
    .trim(),
], getTagsbyBlog)

router.post('/getCommentsPerBlog', [
    body('blogID', "Please enter blog id")
    .notEmpty()
    .escape()
    .trim()
], getCommentsbyBlog);

router.post('/getBlogsByUser',[
    body('username', "Please enter username")
    .notEmpty()
    .escape()
    .trim(),
], getBlogByUser);

router.post('/getBlogByID', [
    body('blogID', "Please enter blog id")
    .notEmpty()
    .escape()
    .trim(),
], getBlogByID);

router.post('/follow', [
    body('leader_name', "Please enter leader name")
    .notEmpty()
    .escape()
    .trim(),
    body('follower_name', "Please enter follower name")
    .notEmpty()
    .escape()
    .trim(),
], followUser);

router.post('/getSameFollowers', [
    body('follower_one', "Please enter leader name")
    .notEmpty()
    .escape()
    .trim(),
    body('follower_two', "Please enter follower name")
    .notEmpty()
    .escape()
    .trim(),
], getSameFollowers);

router.post('/getMostPositiveBlogs', [
    body('username', "Please enter username")
    .notEmpty()
    .escape()
    .trim()
], getPositiveBlogsByUser);

router.get('/getAllUsers', getAllUsers);
router.get('/initializeDB', initializeDatabase);
router.get('/getAllBlogs', getAllBlogs);
router.get('/usersWhoNeverPostedBlog', getUsersWhoNeverPostedBlogs);
router.get('/usersWhoPostedOnSameDate', getUsersWhoPostedOnSameDate);
router.get('/getBlogsWithPositiveCommentsOnly', getAllBlogsWithPositiveCommentsOnly);
router.get('/getUsersWhoOnlyPostedNegativeComments', getUsersWhoPostedNegativeOnly);
module.exports = router;
