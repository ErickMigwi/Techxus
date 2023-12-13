const db = require('../config/db')
const logger = require('../config/logger')

const createTableProducts = async()=>{
    const dbconnection = await db.getConnection()

    try{
        await dbconnection.query('CREATE TABLE IF NOT EXISTS products ( idproduct VARCHAR(250) PRIMARY KEY,product_name VARCHAR(250),product_price VARCHAR(250),product_desc VARCHAR(3000), main_img VARCHAR(250),more_imgs VARCHAR(350), brand VARCHAR(350), type VARCHAR(260))')
    }catch(err){
        logger.log({
            level:'error',
            message:'creating table products query',
            error:err.message
        })
    }
    finally{
        dbconnection.release()
    }
}
const addProduct = async(data, imagename)=>{
    console.log(data);
    console.log(imagename);
    const dbconnection = await db.getConnection()
    
    try{
        console.log(data);
        await dbconnection.query('insert into products (product_name, product_price, product_desc, main_img,idproduct, brand, type) values(?,?,?,?, ?, ?, ?)',[data.prodName, data.prodPrice,data.prodDesc, imagename, data.idproduct, data.brand, data.prodType] )
        return "product added"
    }catch(err){
        logger.log({
            level:'error',
            message:'add product model',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
    
}
const addMoreImgs = async(imgs, id)=>{
    const dbconnection = await db.getConnection()
    try{
     console.log(imgs, id);
     await dbconnection.query('update products set more_imgs = ? where idproduct = ?', [imgs, id])
     return 'more images added'
    }catch(err){
        logger.log({
            level:'error',
            message:'add multiple images',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const getProducts = async(data)=>{
    const dbconnection = await db.getConnection()
    try{
        const products = await dbconnection.query('select * from products')
      return products[0]  
    }catch (err){
        logger.log({
            level:'error',
            message:"fetching products",
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const getProdByType = async(data)=>{
    console.log(data.type);
    const dbconnection  = await db.getConnection()
    try{
        const res = await dbconnection.query('select * from products where type = ?', [data.type])
        return res[0]
    }catch (err){
        logger.log({
            level:'error',
            message:'fetching products by type',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
module.exports = {createTableProducts, addProduct,addMoreImgs, getProducts,getProdByType}