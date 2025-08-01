const express=require('express')
const route=express.Router()
const { createblog, getallblogs, updateblog, deleteblogbyId, getblogbyId, } = require('../controller/blogsController')
const upload=require('../Middleware/imgClodmiddleware')


route.get('/getallblogs',getallblogs);
// route.get('/getblogbyId/:id',getablogsbyId)
route.get('/myblogs',getblogbyId)
route.post('/createblog',upload.single('image'),createblog)
route.patch('/updateblog/:id',updateblog)
route.delete('/deleteblog/:id',deleteblogbyId)



module.exports=route;