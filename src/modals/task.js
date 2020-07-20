const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User' //this is modal name which is exported used to connect to user
        }
    },{
        timestamps:true
    }
)

const Task = mongoose.model('Task',taskSchema)

module.exports = Task