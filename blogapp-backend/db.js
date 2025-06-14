const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri=process.env.MONGO_URI

const connectToMongo=async()=>{
    try {
        await mongoose.connect(mongoUri,{
             useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Atlas successfully");
        
    } catch (error) {
         console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Optional: exit the app on failure
    }

}
module.exports=connectToMongo;