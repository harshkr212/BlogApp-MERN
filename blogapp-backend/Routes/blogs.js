const express=require('express')
const router=express.Router();
const Blog=require('../Schema/Blogs');
const fetchuser=require('../middleware/fetchuser')
const upload = require('../middleware/upload');



//Route 1 Add a blog using post request api/blogs/addblog  Login required
// router.post('/addblog',fetchuser,upload.single('image'),async(req,res)=>{
//     try {
//         const {title,content,author,slug}=req.body;
//          const image = req.file ? req.file.filename : "";

//         const blog=new Blog({
//             title,content,author,slug,user: req.user.id,image
//         })
//         const SavedBlog=await blog.save();
//         res.json(SavedBlog);

//     } catch (error) {
//             console.error("Blog creation failed",error);
//             //sending response to the user
//             res.status(500).send("Blog creation failed")
        
//     }
// })
router.post('/addblog', fetchuser, (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({error:"Image upload failed"});
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, content, author, slug } = req.body;
    const image = req.file ? req.file.filename : "";

    const blog = new Blog({
      title,
      content,
      author,
      slug,
      user: req.user.id,
      image
    });

    const SavedBlog = await blog.save();
    res.json(SavedBlog);
  } catch (error) {
   console.error("Blog creation failed:", error.message, error.stack);
    res.status(500).json({error:"Blog creation failed"});
  }
});

//Route 2 view all blogs using get api/blogs/viewallblogs  Login required
router.get('/getblogs',fetchuser,async(req,res)=>{
    try {
        const blogs=await Blog.find({user: req.user.id});
        res.json(blogs);
    } catch (error) {
          console.error(error.message);
            //sending response to the user
            res.status(500).send("Internal Server error")
        
        
    }
})
//Route 3 delete a blog using api/blogs/deleteblog  Login required
router.delete('/deleteblog/:id',fetchuser,async(req,res)=>{
    try {
        let blog= await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).send("Not Found");
        }
        // if(blog.user.toString()!==req.user.id){
        //   return res.status(401).send("Not Allowed");
        // }
        blog=await Blog.findByIdAndDelete(req.params.id);
        res.json({success:true,blog});
    } catch (error) {
        console.error(error.message);
            //sending response to the user
            res.status(500).send("Internal Server error")
        
    }
})
//Route 4 Get all posted blogs api/blogs/postedblogs NO login required
router.get('/postedblog',async(req,res)=>{
    try {
        let blogs=await Blog.find();
       const postedBlogs= blogs.filter((blog)=>{
            return blog.posted==true;
        })
        res.json(postedBlogs);
    } catch (error) {
        console.error(error.message);
        //sending response to the user
        res.status(500).send("Internal Server error")
        
    }
})
//Route 5 Set true to the posted api/blogs/postblog Login required
router.put('/markposted/:id',fetchuser,async(req,res)=>{
   try {
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        return res.status(404).send("Not found");
    }
    if(blog.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    blog= await Blog.findByIdAndUpdate(req.params.id,{$set:{posted:true}},{new: true})
    res.json(blog);
   } catch (error) {
     console.error(error.message);
        //sending response to the user
        res.status(500).send("Internal Server error")
    
   }
})
//Route 6 Update my blogs api/blogs/updateblog Login required
router.put('/updateblog/:id',fetchuser,async(req,res)=>{
   try {
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        return res.status(404).send("Not found");
    }
    if(blog.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    const {title,content,auther,slug}=req.body;
  
    const newBlog={}
    blog= await Blog.findByIdAndUpdate(req.params.id,{$set:{title:title,content:content,author:auther,slug:slug}},{new: true})
    res.json(blog);
   } catch (error) {
     console.error(error.message);
        //sending response to the user
        res.status(500).send("Internal Server error")
    
   }
})

module.exports=router