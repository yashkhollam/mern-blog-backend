const {v2:cloudinary} =require ('cloudinary')
const dotenv=require('dotenv');
dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:  process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})

module.exports=cloudinary