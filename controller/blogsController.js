const blogModel = require('../model/blogSchema.js');
const cloudinary=require('../database/Cloudinary.js')
const fs=require('fs');



const getallblogs=async(req,res)=>{
    try{
    const getblog=await blogModel.find()

    return res.status(200).json({
        success:true,
        data:getblog
    })
}

catch(err){
    console.log(err)
     return res.status(500).json({
        success:false,
        message:"Internal server problem"
    })
}
}


// const getablogsbyId=async(req,res)=>{
//     try{
//     const getblogbyId=await blogModel.findById(req.params.id)

//     return res.status(200).json({
//         success:true,
//         data:getblogbyId
//     })
// }

// catch(err){
//      return res.status(500).json({
//         success:false,
//         message:"Internal server problem"
//     })
// }
// }


const getblogbyId=async(req,res)=>{
  try{
    console.log("req.user:",req.user)
     const blogbyId=await blogModel.find({createdBy:req.user.id})

     return res.status(200).json({
        success:true,
        message:"Blog data fetch successgully",
        data:blogbyId
     })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"failed fetch blog data",
       
     })
  }
}



const createblog=async(req,res)=>{
 try{
 
   if(!req.file){
    return res.status(401).json({
        success:false,
        message:"Image file is requied"
    })
   }
   
   const filepath=req.file.path
    const {title,description,author}=req.body;
    
    
     const result=await cloudinary.uploader.upload(filepath)
    fs.unlinkSync(filepath)
    // console.log(result)
   
   


 const today = new Date();
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-GB', options).replace(/ /g, '/');

console.log(formattedDate); // 👉 "1/Mar/2025"

    const newblog=await blogModel.create({
        title,
        description,
        author,
        imgurl:result.secure_url,
        public_id:result.public_id,
         createddata:formattedDate,
    })
    return res.status(201).json({
        success:true,
        message:"Blog posted successffully",
        data:newblog,
        

    })
 }

 catch(err){
    console.log(err)
     return res.status(500).json({
        success:flase,
        message:"Internal server problem",
        
    })
 }

    
}

const updateblog=async(req,res)=>{
    const{title,author,category,description  }=req.body
    try{
    const updateblogbyID=await blogModel.findByIdAndUpdate(req.params.id,{
        title,
        author,
        category,
        description
    },{new:true})
    return res.status(201).json({
        success:true,
        message:"Blog updated successfully",
        data:updateblogbyID
    })
}

catch(err){
    console.log(err)
    return res.status(201).json({
        success:true,
        message:"Internal Serevr problem",
       
    })
}
}


const deleteblogbyId=async(req,res)=>{
    try{
  

    const deleteblog=await blogModel.findByIdAndDelete(req.params.id)
   
    
        if(deleteblog.public_id){
             await cloudinary.uploader.destroy(req.public_id)
    }   

   

    return res.status(200).json({
        success:true,
        message:"Blog deleted successfully",
        data:deleteblog
    })

   
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
        success:false,
        message:"Failed to delete the Blog ",
        data:deleteblog
    })
    }

}

module.exports={getallblogs,getblogbyId,createblog,updateblog,deleteblogbyId};