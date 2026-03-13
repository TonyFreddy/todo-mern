const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task.model');
const PORT = 4000;

const app = express();
app.use(express.json());



//Get all the tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one single task
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// update a task 
app.put('/api/tasks/:id', async (req, res) => {
    try {
         const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id ,req.body);

        if (!task){
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await Task.findById(id);
            res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a task
app.delete ('/api/tasks/:id', async (req, res) => {
    try {
         const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task){
            return res.status(404).json({ message: "Task not found" });
        }
        
            res.status(200).json({ message : "Task deleted successfuly"});

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