import mongoose, {Schema} from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Enter FirstName"]
    },
    lastName:{
        type:String,
        required:[true,"Enter LastName"]
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["student","instructor"],
        default:"student"
    }, 
},{
    timestamps:true
})


const User= mongoose.model('User',userSchema);
export default User;