const mongoose= require("mongoose");
const schema= mongoose.Schema;

const userSchema= new schema({
    firstName:{
        type:String,
        required:[true,"First name of the user is mandatory field"]
    },
    lastName:{
        type:String,
        required:[true,"Last name of the user is mandatory field"]
    },
    email:{
        type:String,
        required:[true,"Email of the user is mandatory field"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is mandatory field"]
    }
},{
    timestamps:true
});

const userModel = mongoose.model("users",userSchema);

module.exports=userModel;