const express = require("express");
const router =express.Router();
const { getAllTask } = require('../controllers/task.controller');



//Get all the tasks
router.get("/" , getAllTask);

module.exports = router;