import mongoose, { version } from 'mongoose';
 
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : false
    },
    email : { 
        type : String ,
        required : true , 
        unique : true
     },
     password : {
        type : String ,
        required : true
     }
}, { versionKey: false })

const UserModel = mongoose.model("user",userSchema)
 
export  {UserModel as User}