const winston = require('winston')

const logger = winston.createLogger({
    level:'error',
    format:winston.format.combine(
       winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  
        winston.format.json()
      
    ),
    transports:[
        new winston.transports.File({filename:'error.log', level:'error'})
    ]  
})

module.exports = logger