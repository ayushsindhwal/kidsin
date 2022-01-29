require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const SocketServer = require('./socket');
const fileUpload = require('express-fileupload');


const app=express()
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(cookieParser())
app.use(express.static(__dirname + 'public'))
const admin = require('./routes/admin');

//Sockets
const http=require('http').createServer(app)
const io=require('socket.io')(http)

io.on('connection',socket=>{
    SocketServer(socket)

})


//Routes
app.use('/admin',admin)
app.use(express.static('public'))
app.use('/api',require('./routes/data'))
app.use('/api',require('./routes/auth'))
app.use('/api',auth,require('./routes/user'))
app.use('/api',auth,require('./routes/post'))
app.use('/api',auth,require('./routes/notify'))
app.use('/api',auth,require('./routes/message'))
app.use('/api',auth,require('./routes/comments'))



// 
if(process.env.NODE_ENV==='Production')
{
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const URI=process.env.MONGO_URL
mongoose.connect(URI,{
    authSource: 'admin',
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
},err=>{
    if(err) throw err
    console.log('Connected to mongodb ')
})


const PORT=process.env.PORT || 5000
http.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`)
})