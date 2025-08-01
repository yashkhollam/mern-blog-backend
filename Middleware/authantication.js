const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    try{
        const authheader=await req.headers['authoraization']
        const token=authheader && authheader.split(' ')[1];

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Unauthorize token or wrong token"
            })
        }
        
        const decoded= jwt.verify(process.env.JWTSECRET)
         req.user=decoded
 next()

         return res.status(200).json({
            success:true,
            message:"It's Authorized token"
         }) 
        
    }
   
    catch(err){
       
         return res.status(500).json({
            success:false,
            message:"Internal server problem"
         }) 
    }
}

module.exports=verifyToken