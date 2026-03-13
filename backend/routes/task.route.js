const express = require("express");
const router =express.Router();
const { getAllTask , getSingleTask , createTask , updateTask , deleteTask } = require('../controllers/task.controller');



//Get all the tasks
router.get("/" , getAllTask);

// get a single task
router.get("/:id",getSingleTask);

// Create a new task
router.post("/" , createTask);

// update a task 
router.put("/:id", updateTask);

//delete a task
router.delete("/:id" , deleteTask);

module.exports = router;