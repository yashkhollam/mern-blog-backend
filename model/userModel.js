const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const userModel=mongoose.model('usermodel',UserSchema)

module.exports=userModel;