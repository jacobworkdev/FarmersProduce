const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db.js')
const authRoutes= require('./routes/authRoutes.js')
const produceRoutes = require('./routes/produceRoutes.js')

const PORT=process.env.PORT || 5000

dotenv.config()
//connect to db
connectDB()

const app= express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));


app.use('/api/auth',authRoutes)
app.use('/api/produce',produceRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

//    my produce route  /api/produce/myproduce