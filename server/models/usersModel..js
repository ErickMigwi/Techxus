const db = require('../config/db')
const logger = require('../config/logger')
const bcrypt = require('bcrypt')

const createTableUsers = async()=>{
    const dbconnection = await db.getConnection()
    try{
        await dbconnection.query('create table if not exists users (idusers INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(250) ,firstname VARCHAR(250), lastname VARCHAR(250), password VARCHAR(1250), profileimage VARCHAR(250))')
    }catch(err){
        logger.log({
            level:'error',
            message:'creating table',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const createAcc = async(data)=>{
    dbconnection = await db.getConnection()
    try{
       const duplicateUser = await dbconnection.query('select * from users where email = ?', [data.email])
       if(duplicateUser[0].length > 0){
        return{dup:'try logging in', msg:""}
       }else{
        const hashedPassword = await bcrypt.hash(data.password, 10)
        if(hashedPassword){
            await dbconnection.query('insert into users (email, firstname, lastname, password)values(?,?,?,?)', [data.email, data.firstname, data.lastname,hashedPassword])

        }
        return{dup:'', msg:"Account created successfully"}
       }
    }catch (err){
        logger.log({
            level:'error',
            message:'creating user account',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const login = async(data)=>{
    const dbconnection =await db.getConnection()
    
    try{
        console.log(data);
        const userExists =await dbconnection.query('select * from users where email = ? ',[ data.email])
        if(!userExists[0].length > 0){
            return{err:"User doesn't exist, click create account"}
        }else{
            const pswdCorrect = await bcrypt.compare(data.password, userExists[0][0].password)
            if(!pswdCorrect){
                return {err:"Incorrect password, Check your password and try again"}
            }else{
                console.log(pswdCorrect);
               return {logginState:true, userId:userExists[0][0].idusers, msg:`Welcome ${userExists[0][0].firstname}, happy shopping`} 
              
            }
        }
    }catch (err){
        logger.log({
            level:'error',
            message:'user login',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}
const userDetails = async(data)=>{
    const dbconnection = await db.getConnection()
    try{
        const userDetails = await dbconnection.query('select * from users where idusers = ?', [data])
        return userDetails[0]
    }catch (err){
        logger.log({
            level:'error',
            message:'fetching userDetails',
            error:err.message
        })
    }finally{
        dbconnection.release()
    }
}

module.exports = {createAcc, createTableUsers, login, userDetails}