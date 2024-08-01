import mongoose from "mongoose";


const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        userStatus:{type:String},
        savedProperties:{type:[]},
        postedProperties:{type:[]},
        draftProperties:{type:[]}
    }
)

const userModel=mongoose.model("User",userSchema);

export default userModel;