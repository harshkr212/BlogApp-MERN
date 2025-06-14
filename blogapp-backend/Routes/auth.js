const express=require('express')
const router=express.Router()
const User=require('../Schema/user')
var jwt = require('jsonwebtoken');
const JWT_Secret = "letsdoit";
const fetchuser=require('../middleware/fetchuser')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');

//Route 1 Creating a user account using Post : NO login required
router.post('/createuser',[body('email').isEmail().withMessage("Enter a valid email"),
    body("name").isLength({min: 5}).withMessage("Name must contain atleast 5 characters"),
    body("password").isLength({min: 8}).withMessage("Password must contain atleast 8 characters")
],async(req,res)=>{
        const errors = validationResult(req);
        let success=false;
      if (!errors.isEmpty()) {
         return res.status(400).json({success:success,errors: errors.array() });
      }
    try {
        const {name,email,password}=req.body;
        //check whether the user already exists
        let user= await User.findOne({email:email});
        if(user){
           return res.status(400).json({success:success,errors: "Sorry a user with this email already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(password,salt);

        user=await User.create({
            name:name,
            email:email,
            password:secPass
        })
        const data={
            user:{
                id:user.id
            }
        }
        //creating a jwt token to send it to the user
        const authToken=jwt.sign(data,JWT_Secret)
        //sending authtoken to the user
        success=true;
        res.json({success:success,authToken:authToken,message:"User Successfully registered"})


        
    } catch (error) {
          console.error(error.message);
         //sending response to the user
         res.status(500).send("Internal Server error")
        
    }

})
// Router 2 Authenticate a user using POST request :NO login required
router.post('/login',[body('email').isEmail().withMessage("Enter a valid email"),
    body("password").isLength({min: 8}).withMessage("Password must contain atleast 8 characters")
],async(req,res)=>{
       const errors = validationResult(req);
        let success=false;
      if (!errors.isEmpty()) {
         return res.status(400).json({success:success,errors: errors.array() });
      }
      try {
        let user =await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({success:false,error:"Please try to login with correct credentials"});
        }
      const passCompare=await bcrypt.compare(req.body.password,user.password);
      if(!passCompare){
       return res.status(400).json({success:false,error:"Please try to login with correct credentials"});
      }
     const data={
        user:{
            id:user.id
        }
     }
     const authToken=jwt.sign(data,JWT_Secret);
     success=true;
    res.json({success:success,authToken:authToken,message:"User Successfully Logged in"})
        
      } catch (error) {
         console.error(error.message);
         //sending response to the user
         res.status(500).send("Internal Server error")
        
      }

})
//Route 3 Get User details using GET request Login reqired
router.get('/getuser',fetchuser,async (req,res)=>{
try {
       let success=false;
    const newuser=await User.findById(req.user.id);
    if(!newuser){
        res.status(401).send("Not found");
    }
    res.json(newuser);
    
} catch (error) {
     console.error(error.message);
         //sending response to the user
         res.status(500).send("Internal Server error")
}
})
// router.get('/try',(req,res)=>{
//     res.send("Route is working without token");
// })
module.exports=router