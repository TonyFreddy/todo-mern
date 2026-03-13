const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    task: {
        type: String,
        required: [true, "This field is required"],
    },
    taskDone: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        enum: ['red', 'blue', 'yellow', 'pink', 'green', 'gray'],
        default: 'gray',
    },
},
{
    timestamps: true,
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;