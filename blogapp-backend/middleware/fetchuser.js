//import jwt
var jwt = require('jsonwebtoken');
// define secret jwt code same as auth.js
const JWT_Secret = "letsdoit";
//creating a middleware function in express to get id through the token 
const fetchuser=(req,res,next)=>{
   
    try {
    //Get the user from the jwt token and id to req the object
    //getting the token from the request header
    const token=req.header("auth-token");
    if(!token){
       return res.status(401).send({error:"Pease Authenticate using valid token 312"})
    }
    //verify the token with jwt secret code 
    const data=jwt.verify(token,JWT_Secret);
    //appending the id which we got in the data throught the token
    req.user=data.user;
    //calling the next fuction
    next();
        
    } catch (error) {
        res.status(401).send({error:"Pease Authenticate using valid token 212"})
    }
}
//exporting the file
module.exports=fetchuser;