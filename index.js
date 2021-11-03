const express = require('express');
const routes = require('./routes');
var cors = require('cors')
const app = express();
const {register} = require('./controllers/registerController');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('./database').promise();
app.use(express.json());
app.use(routes);
app.use(cors());
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.post('/register', async register => {
  console.log("registered user")
})

app.get('/ping', (req,res) =>{
  res.json({message:"Hello from server"});
});
app.listen(5000,() => console.log('Server is running on port 5000'));