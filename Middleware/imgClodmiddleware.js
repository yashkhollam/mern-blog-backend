const cloudinary=require('cloudinary')
const path=require('path')
const fs=require('fs')
const multer=require('multer')

const uploadpath=path.join(__dirname,'..','public','images')



if(!fs.existsSync(uploadpath)){
    fs.mkdirSync(uploadpath,{recursive:true})
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadpath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage})

module.exports=upload