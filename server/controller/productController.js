const logger  = require('../config/logger')
const productModel = require('../models/productsModel')

exports.addProduct = async(req, res)=>{
    const data = req.body
    console.log(data);
const imagename = req.file.filename
    try{
       await  productModel.createTableProducts()
    const response = await productModel.addProduct(data, imagename)
    res.send({response})
    }catch(err){
        logger.log({
            level:'error',
            message:'add product controller',
            error:err.message
        })
    }
}
exports.addMoreImgs = async(req, res)=>{
    const data = []
    for (let i = 0; i < req.files.length; i++) {
       
        data.push(req.files[i].filename)
    }
        if(data.length > 0){
            productModel.addMoreImgs(data.join(','), req.body.idproduct)
            res.send({msg:'images saved'})
        }
}

exports.getProducts = async(req, res)=>{
    try{
        res.send(await productModel.getProducts())
    }catch (err){
        logger.log({
            level:"error",
            message:'get products controller',
            error:err.message
        })
    }
}
exports.getProdByType = async(req, res)=>{
    const data = req.query
    console.log(data);
    try{
        const Res = await productModel.getProdByType(data)
        if(Res.length > 0){
            console.log(Res);
            res.send(Res)
        }else{
            res.send({msg:'No products were found'})
        }
    }catch (err){
        logger.log({
            level:'error',
            message:'fetch by type controller',
            error:err.message
        })
    }
}