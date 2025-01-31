const mongoose = require('mongoose');
require('dotenv').config();
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true
        })
        console.log('Mongodb connecte .........')
    } catch (error) {
        console.log('MongoDB connection error:', error)
        process.exit(1);
    }
}

module.exports=connectDb;