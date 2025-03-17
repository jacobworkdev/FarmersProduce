const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config() 

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected")
    }catch(error){
        console.error("mongodb didn't connect successfully",error)
        process.exit(1)
    }
}

module.exports = connectDB