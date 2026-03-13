const Task = require("../models/task.model");

// Get all tasks
const getAllTask = async ( req , res) =>{
     try {
        const task = await Task.find({});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTask,
};