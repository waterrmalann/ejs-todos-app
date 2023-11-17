import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const todoModel = mongoose.model("Todo", todoSchema);

export default todoModel;