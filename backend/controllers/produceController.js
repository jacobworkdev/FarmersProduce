const Produce = require('../models/Produce.js')
const mongoose = require('mongoose')
exports.createProduce = async (req, res) => {
    try {
        const { name, quantity, unit, price } = req.body
        const imageUrl = req.file ? req.file.path : ""

        const produce = await Produce.create({
            farmer: req.user.id,
            name, quantity, unit, price, imageUrl
        })
        res.status(201).json(produce)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getAllProduce = async (req, res) => {
    const produce = await Produce.find().populate("farmer", 'name')
    res.json(produce)
}

exports.deleteProduce = async (req, res) => {
    try {
        const { id } = req.params
        const produce = await Produce.findById(id)

        console.log(id)
        if (!produce) {
            console.log(produce)
            console.log(mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: 'produce not found' })
        }

        if (produce.farmer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'unauthorized farmer-produce is posted by some other farmer' })
        }

        await produce.deleteOne()
        res.json({ message: 'produce deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('error in delete produce controller')
    }
}

exports.getProduceById = async (req, res) => {
    try {
        const { id } = req.params
        const produce = await Produce.findById(id)
        if (!produce) {
            return res.status(404).json({ message: 'product not found' })
        }
        res.status(200).json(produce)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('error in getProduceById controller')
    }
}

exports.updateProduce = async (req, res) => {
    try {
        console.log("updateProd run test")
        const { id } = req.params
        const { name, quantity, unit, price } = req.body
        const produce = await Produce.findById(id)
        if (!produce) {
            return res.status(404).json({ message: 'product not found' })
        }
        console.log(req.user.id)
        //validate farmer id
        if (produce.farmer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'unauthorized farmer' })
        }

        const imageUrl = req.file ? req.file.path : produce.imageUrl

        produce.name = name || produce.name;
        produce.quantity = quantity || produce.quantity;
        produce.unit = unit || produce.unit;
        produce.price = price || produce.price;
        produce.imageUrl = imageUrl;

        const updatedProduce= await produce.save()
        res.status(200).json({message:'update successfull'})


    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('error in the produpdate controller')
    }
}

exports.getMyProduce = async (req, res) => {
    try {

        const produce = await Produce.find({farmer:req.user.id})
        res.status(201).json(produce)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}