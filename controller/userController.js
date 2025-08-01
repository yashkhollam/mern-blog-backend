const userModel=require('../model/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const SignUp=async(req,res)=>{
     try{   
    const{username,email,password}=req.body

        const user=await userModel.findOne({email})
        if(user){
            return res.status(401).json({
                success:false,
                message:"User already exist !! Please Login"
            })
        }

        const newuser=new userModel({username,email,password})
              newuser.password=await bcrypt.hash(password,10)
         await newuser.save();


         return res.status(201).json({
            success:true,
            message:"SignUp Successfully",
            data:newuser
         })
    }

    catch(err){
      
         return res.status(500).json({
            success:false,
            message:"Internal Server problem"
         })
    }
}



const Login=async(req,res)=>{
    const{email,password}=req.body
   try{
    const userexist=await userModel.findOne({email})
    if(!userexist){
        return res.status(401).json({
            success:false,
            message:"User does not exist!! Please SignUp"
        })
    }

    const ispasswordCorrect=await bcrypt.compare(password,userexist.password)
    if(!ispasswordCorrect){
        return res.status(401).json({
            success:false,
            message:"Password is incorrect!!Plese try again"
        })
    }

    const jwtToken=jwt.sign({email:userexist.email,id:userexist._id},
         JWTSECRET=process.env.JWTSECRET,
         {expiresIn:"24h"}
    )
     return res.status(200).json({
        success:false,
        message:"Login Successfully",
         username:userexist.username,
        jwttoken:jwtToken,
       
     })

    }
    catch(err){
          return res.status(500).json({
            success:false,
            message:"Internal Server problem"
         })
    }
}

module.exports={SignUp,Login}