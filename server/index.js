const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const dotenv  = require('dotenv')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/proudctRoute')
const cartRouter = require('./routes/cartRoute')
const session = require('./config/session')
const cookieParser = require('./config/cookieParser')
dotenv.config()
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(session)
app.use(cookieParser)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart',cartRouter)
const port = process.env.port
const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`server running on port:${3500}`)
})