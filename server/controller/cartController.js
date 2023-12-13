const cartModel = require('../models/cartModel')
const logger = require('../config/logger')

exports.setCart = async(req, res)=>{
    const data = req.body
    console.log(data);
    try{
      const createTable =    await cartModel.createCart()
      console.log(createTable);
        if(createTable){
            const Res = await cartModel.setCartItem(data)
            console.log(Res);
            if(Res){
                res.send({msg:Res})
            }
        }
        }catch(err){
            logger.log({
                level:'error',
                message:'adding item to cart controller',
                error:err.message
            })
        }
}
exports.cartedProduct = async(req, res)=>{
    const data = req.body
    try{
        const cartedProds = await cartModel.fetchCartItems(data)
        res.send(cartedProds)
       
    }catch(err){
        logger.log({
            level:'error',
            message:'fetching carted items controller',
            error:err.message
        })
    }
}
exports.setQuantity = async(req, res)=>{
    const data = req.body
    try{
      const Res=  await cartModel.setQuantity(data)
      if(Res.suc===true){
       res.status(200).send({msg:`Quantity set to:${data.quantity} `}) 
      }else{
        res.status(500).send("an Error has occured")
      }
    }catch(err){
        logger.log({
            level:'error',
            message:'Error occured at set quantity controller',
            error:err.message
        })
    }
}
exports.delItemInCart = async(req, res)=>{
    const data = req.query
    try{
        const Res = await cartModel.delItemInCart(data)
        res.send({msg:Res})
    }catch(err){
        logger.log({
            level:'error',
            message:'Occured in del item in cart controller',
            error:err.message
        })
        
    }
}