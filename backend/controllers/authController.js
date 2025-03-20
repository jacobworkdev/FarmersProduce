const Farmer = require('../models/Farmer.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.registerFarmer = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (await Farmer.findOne({ email })) {
            return res.status(400).json({ message: 'Email already registered' })
        }
        const farmer = await Farmer.create({ name, email, password })
        res.status(201).json({ message: 'farmer registered successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('error in auth controller register')
    }
}

exports.loginFarmer = async (req, res) => {
    try {
        const { email, password } = req.body
        const farmer = await Farmer.findOne({ email })

        if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
            return res.status(401).json({ message: "invalid credentials" })
        }
        res.json({
            user: {
                id: farmer._id,
                name: farmer.name,
                email: farmer.email,
            }, 
            token: generateToken(farmer._id)
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('error in auth controller login')
        console.log(error)
    }
}