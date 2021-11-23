const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/login_register_Controller/registerController');
const {login} = require('./controllers/login_register_Controller/loginController');
const {getAllUsers} = require('./controllers/login_register_Controller/getAllUsersController');
const {initializeDatabase} = require('./controllers/login_register_Controller/initializeDatabaseController');
const {createBlog} = require('./controllers/blogControllers/createBlogController');

var cors = require('cors')
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


router.get('/getAllUsers', getAllUsers);
router.get('/initializeDB', initializeDatabase);
module.exports = router;