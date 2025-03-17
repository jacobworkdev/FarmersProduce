const mongoose = require('mongoose')

const ProduceSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: '' },
    available: { type: Boolean, default: true }
},
    { timestamps: true }
)

module.exports = new mongoose.model('Produce',ProduceSchema)