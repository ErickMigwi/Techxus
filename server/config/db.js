const mysql2 = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql2.createPool({
    host:process.env.dbHost,
    user:process.env.dbUser,
    database:process.env.dbName,
    password:process.env.dbPassword,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

module.exports = pool.promise()