const Produce = require('../models/Produce.js')

exports.createProduce = async (req,res)=>{
    try{
        const {name,quantity,unit,price} = req.body
        const imageUrl = req.file ? req.file.path:""

        const produce = await Produce.create({
            farmer:req.user.id,
            name,quantity,unit,price,imageUrl
        })
        res.status(201).json(produce)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.getAllProduce = async (req,res)=>{
    const produce = await Produce.find().populate("farmer",'name')
    res.json(produce)
}

