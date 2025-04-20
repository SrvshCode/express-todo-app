const mongoose=require("mongoose");
const schema=mongoose.Schema;


const todoSchema= new schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    title:{
        type:String,
        required:[true,"Title of todo is required"]
    },
    description:{
        type:String, 
        required:[true,"Description of todo is required"]
    },
    isCompleted:{
        type:Boolean
    }
},{
    timestamps:true
});

const todoModel= mongoose.model("todos",todoSchema);

module.exports=todoModel;