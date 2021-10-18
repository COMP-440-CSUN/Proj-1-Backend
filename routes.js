const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');

const e = require('cors');

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
    body('username', "Invalid username")
    .notEmpty()
    .escape()
    .trim(),
    body('password',"The Password must be of min 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
], login);

module.exports = router;