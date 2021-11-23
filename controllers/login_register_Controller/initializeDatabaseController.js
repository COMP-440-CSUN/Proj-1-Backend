const conn = require('../../database').promise();
const path = require('path');
const fs = require('fs');

exports.initializeDatabase = async(req, res) => {
    const users = fs.readFileSync(path.join(__dirname, '../university-1.sql')).toString();
    try{
        const query = await conn.query(users);
        const[rows] = await conn.query(users);
        console.log("Query Successful")
        return res.json({message: 'Query Successful'});

    } catch(err){
        return err;
    }
    
}

