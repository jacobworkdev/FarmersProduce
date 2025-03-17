const express = require('express')
const {protect} = require('../middleware/authMiddleware.js')
const upload = require('../middleware/uploadMiddleware.js')
const {createProduce,getAllProduce,deleteProduce} = require('../controllers/produceController.js')

const router = express.Router();

router.post('/',protect,upload.single('image'),createProduce)
router.get('/',getAllProduce)
router.delete('/:id',protect,deleteProduce)
module.exports=router
