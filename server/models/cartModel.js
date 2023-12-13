const db = require('../config/db')
const logger = require('../config/logger')

const createCart = async()=>{
    const dbconnection = await db.getConnection()
    try{
        await dbconnection.query('create table if not exists cart (idcart INT AUTO_INCREMENT PRIMARY KEY, iduser VARCHAR(300), idproduct VARCHAR(250), quantity VARCHAR(250))')
        return 'cart created'
    }catch (err){
        logger.log({
            level:'error',
            message:'creating table cart',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const setCartItem = async(data)=>{
        const dbconnection = await db.getConnection()
        try{
          const checkDuplicates =await dbconnection.query('select * from cart where iduser = ? and idproduct = ?', [data.iduser, data.idproduct])
          console.log(checkDuplicates[0]);
          if(checkDuplicates[0].length  > 0){
            return({msg:'Item already added'})
          }else{
        
            await dbconnection.query('insert into cart (iduser, idproduct, quantity) values (?,?,?)', [data.iduser, data.idproduct, data.quantity])
            return {msg:'item add to cart`'}
          }
        }catch (err){
            logger.log({
                level:'error',
                message:'adding product to cart model',
                error:err.message
            })
        }finally{
            dbconnection.release()
        }
}
const fetchCartItems = async(data)=>{
    const dbconnection = await db.getConnection()
    console.log(data);
    try{
        const cartedProductsId = await dbconnection.query('select * from cart where iduser = ?', [data.iduser])
    // console.log(cartedProductsId[0]);
        const idproduct =cartedProductsId[0].map(e=>{
        return `${e.idproduct}`
       })
      console.log(idproduct);
        if(idproduct){
         console.log(1);
            const cartedProduct =    await dbconnection.query(`SELECT * FROM products join cart on products.idproduct = cart.idproduct WHERE products.idproduct IN (${idproduct.map(id => `'${id}'`).join(',')})`);

            console.log(1)
            console.log(cartedProduct[0]);;
            return cartedProduct[0]
        }else{
            return []
        }
    }catch(err){
        logger.log({
            level:'error',
            message:'fetching carted products model',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const setQuantity = async(data)=>{
    const dbconnection = await db.getConnection()
    try{
        console.log(data);
        await dbconnection.query('update cart set quantity = ? where idproduct = ?', [data.quantity, data.id])
        return {suc:true}
    }catch(err){
        logger.log({
            level:'error',
            message:'setting quantity',
            error:err.message
        })
        return {suc:false}
    }finally{
        dbconnection.release()
    }
}
const delItemInCart =async data=>{
    const dbconnection = await db.getConnection()
    try{
        await dbconnection.query('delete from cart where idcart = ?', [Number(data.idcart)])
        return {msg:'Item deleted successfully'}
    }catch(err){
        logger.log({
            level:'error',
            message:'Deleting item in cart',
            error:err.message
        })
        return {msg:"An error has occured item not deleted"}
    }finally{
        dbconnection.release()
    }
}
module.exports = {setCartItem, createCart, fetchCartItems, setQuantity , delItemInCart}