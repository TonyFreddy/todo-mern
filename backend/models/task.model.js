const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
        task: {
               type: String , 
               required: [true , "This dield is required"],
        },
        taskDone : {
            type: Boolean,
            required: true 
        },
        color : {
            type : String,
            enum: ['red' , 'blue' , ' yellow' , 'pink' , ' green', 'gray'],
            default: 'gray',
        },
},
{ 
    Timestamps : true ,
}
);

const Task = mongoose.model("Task" , TaskSchema);

module.exports = Task;