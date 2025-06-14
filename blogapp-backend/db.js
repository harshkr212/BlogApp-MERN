const mongoose = require('mongoose');
const mongoUri="mongodb://localhost:27017/blogapp"

const connectToMongo=async()=>{
    try {
        await mongoose.connect(mongoUri,{
             useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongo successfully");
        
    } catch (error) {
         console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Optional: exit the app on failure
    }

}
module.exports=connectToMongo;