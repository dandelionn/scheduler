const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json')

const app = express();
const port = config.PORT;

app.use(cors());
app.use(express.json());

const uri = config.DATABASE_URI;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

const usersRouter = require('./routes/users');
app.use('/users/', usersRouter);

const tasksRouter = require('./routes/tasks');
app.use('/tasks/', tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
