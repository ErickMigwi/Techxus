const jwt =require('jsonwebtoken')
const logger = require('../config/logger')
const checkAuthToken = (req, res, next)=>{
    const token = req.cookies.token
    console.log(token);
    if(!token){
        return res.status(401).send({msg:"Unauthorised"})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){
            logger.log({
                level:'error',
                message:'verifying a token',
                error:err.message
            })
            return res.sendStatus(403)
        }else{
            req.user = user
            next()
        }
    })
}
module.exports = {checkAuthToken}