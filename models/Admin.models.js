const mongoose=require('mongoose')
const adminModel=new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        // required:true
    }

})
module.exports=mongoose.model("adminlogin",adminModel)