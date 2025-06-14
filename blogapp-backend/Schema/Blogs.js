const mongoose=require('mongoose')
const {Schema}=mongoose;
const blogSchema= new Schema({
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String
        
    },
    slug:{
      type:String,
      default:"default"
    },
    posted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String,
        default:""
    }
})
module.exports=mongoose.model('blogs',blogSchema)