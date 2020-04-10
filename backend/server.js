const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

const usersRouter = require('./routes/users');
app.use('/users/', usersRouter)

let User = require('./models/user.model');

/*
// create a user a new user
var testUser = new User({
    email: 'jmar777@yahoo.com',
    password: 'Password123'
});

/*
// save user to database
testUser.save(function(err) {
    if (err) throw err;
});

User.findOne({email: 'jmar777@yahoo.com'}, (err, user) =>{
    if(err) throw err;
    console.log(user)
    if(user.validatePassword('jmar777'))
        console.log('succes')
    else
        console.log('failed')
})
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
