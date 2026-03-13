const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task.model');
const PORT = 4000;

const app = express();
app.use(express.json());

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect('mongodb://tony:tonydrzzdj@ac-psbcp8z-shard-00-00.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-01.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-02.xqet5tc.mongodb.net:27017/?ssl=true&replicaSet=atlas-5zuooj-shard-0&authSource=admin&appName=todo')
.then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log('Connection failed', err.message);
});