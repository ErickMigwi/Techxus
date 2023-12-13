const express = require('express')
const router  = express.Router()
const productController = require('../controller/productController')
const upload = require('../config/multer')

router.post('/addproduct', upload.single("mainImg"),productController.addProduct)
router.post('/moreImgs', upload.array("moreImgs"), productController.addMoreImgs)
router.get('/getprodcuts', productController.getProducts)
router.get('/fetchByType', productController.getProdByType)
module.exports = router