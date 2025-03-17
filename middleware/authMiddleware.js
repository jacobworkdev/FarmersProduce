const jwt = require('jsonwebtoken')
const Farmer = require('../models/Farmer.js')

exports.protect = async (req,res,next)  =>{
    try{
        const token = req.header('Authorization')?.split(' ')[1]
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        req.user = await Farmer.findById(decoded.id).select('-password')
        
        next()
    }catch(error){
        res.status(401).json({message:'Invalid Token'})
    }
}