const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController')

router.post('/add_to_cart', cartController.setCart)
router.post('/fetchCartItems', cartController.cartedProduct)
router.post('/setQuantity', cartController.setQuantity)
router.delete('/del_carted_item', cartController.delItemInCart)
module.exports = router
