const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task.model');
const taskRoute = require("./routes/task.route");
const connectDB = require("./db/db");
const PORT = 4000;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost/3000',
})
);


// @taskRoute
app.use('/api/tasks' , taskRoute);

// @ Databas and Server

connectDB().then( () => {

    app.listen(PORT , ()=> {
console.log(`Server is running on port ${PORT}`);
    });

});