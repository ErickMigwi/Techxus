const userModel = require('../models/usersModel.')
const logger = require('../config/logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createAcc = async(req, res)=>{
  const data = req.body
 
   if(data){
    try{
        userModel.createTableUsers()
       const accState = await userModel.createAcc(data)
    if(accState){
       
        console.log(accState);
        res.send (accState)
    }
    
    }catch(err){
        logger.log({
            level:'error',
            message:'create account controller',
            error:err.message
        })
    }
   }
}
exports.login = async(req,res)=>{
    const data =req.body
    try{
        const loginState = await userModel.login(data)
        
        if(loginState.logginState){
            //Create a jwt token
            const accessToken = jwt.sign(
                {userId: loginState.userId},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30h'}
            );
            if(accessToken){
                res.cookie('token', accessToken)
            }
            const refreshToken = jwt.sign(
                {userId:loginState.userId},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
                )
            // req.session.userId = loginState.userId
            console.log(loginState.msg);
            res.send({msg:loginState.msg})
        }else{
            
            res.send({err:loginState.err})
        }
    }catch(err){
        logger.log({
            level:"error",
            message:'login in userController',
            error:err.message
        })
    }
}
exports.userDetails = async(req, res)=>{
     if(req.user.userId){
        try{
            const details = await userModel.userDetails(req.user.userId)
            if(details){
                res.send(details)
            }
        }catch (err){
            logger.log({
                level:'error',
                message:'fetching user details controller',
                error:err.message
            })
        }
     }else{
        
     }
}