
const mongoose=require('mongoose')



const BlogSchema=mongoose.Schema({
    title:{
       type:String,
       require:true
    },
    category :{
        type:String,
        require:true
    },
    description :{
       type:String,
        require:true
    },
    author:{
        type:String,
        // require:true
    },
    imgurl:{
        type:String
    },
    public_id:{
        type:String
    },
    // createdby:{
    //    type:String
    // },
    createddata:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userdata"
    },
    
})

const blogModel=mongoose.model('blogdata',BlogSchema)

module.exports=blogModel;