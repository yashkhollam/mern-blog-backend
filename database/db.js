const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const ConnectMD=async()=>{
    try{
        const MongoDB=await mongoose.connect(process.env.MongoDB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,   
        })
        console.log("MongoDB Atlas Connected Suceessfully atlas")


    }
    catch(err){
        console.log("Failed to Connect the MongoDB")
    }
   
}

module.exports=ConnectMD