const joi=require('joi')

const SignUpMiddleware=async(req,res,next)=>{

    const Schema=joi.object({
        username:joi.string.max(100).min(3).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(50).required()
    })
   

    const {error}=Schema.validate(req.body);

    if(error){
        return res.status(401).json({
            success:false,
            message:error.details[0].message
        })
    }
 next()
}


const LoginMiddleware=async(req,res,next)=>{
    const Schema=joi.object({
       email:joi.string().email().required(),
       password:joi.string().min(4).max(100)
    })

    const{error}=Schema.validate(req.body)
    if(error){
        return res.status(401).json({
            success:false,
            message:error.details[0].message
        })
    }
}


module.exports={LoginMiddleware,SignUpMiddleware}