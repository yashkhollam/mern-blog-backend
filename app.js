const express=require('express')
const dotenv=require('dotenv');
const  route  = require('./routes/blog_route');
const ConnectMD = require('./database/db');
const userroute = require('./routes/userroute');
const cors =require('cors')

dotenv.config();
ConnectMD();
const app=express()
const PORT=process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
   res.status(200).json({
    message:"Welcome to the blof app"
   })
})

app.use('/blog',route)
app.use('/auth',userroute)

app.listen(PORT,()=>{
    console.log(`Server run ON PORT =${PORT}`)
})