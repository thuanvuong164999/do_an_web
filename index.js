const express = require('express')
const app = express() // module express, app hỗ trợ server
const port = 5000
const http = require('http') // module http có sẳn trong react
const socketIO = require('socket.io')
// module socket: sử dụng trong phần mềm cần gửi message giữa 2 bên, di chung với express
const server = http.createServer(app) // tạo server http vào gán vào mục server
const io = socketIO(server) //biến <io(có thể đổi)> thực hiện 2 tín hiệu on off
const moment = require('moment')
// const room = 'main'
const cors = require('cors') //module khắc lỗi

//khai báo khi conect postgresql
const pg = require('pg') 
const env = require('dotenv').config() 
const config={
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
console.log(config)
const pool = new pg.Pool(config) 
// connect pgsql

app.use(cors())

io.on('connection', (socket) => { //code mặt định
    //nhận(on) tín hiệu, khi client kết nối với server--socket thì tạo ra socket (tên có thể đổi) (trung gian, như io, thực hiện 2 tín hiệu on/off/emit)
    console.log('Connected') 
    socket.on('send-message', (value) => { //client -(tín hiệu)-> socket--server -(thực hiện lệnh)-> client
        console.log(value)
        let roomName = generrateRoom(value.room) //truyền nội dung của generrateRoom(value.room) vào roomName

        let msg = value.message 
        // value.message = msg.replace(/\:\)/g, '<li class="fas fa-smile"></li>')
        value.message = convert2Icon(msg)
        value.DaT = moment().format('MMMM Do YYYY, h:mm:ss a') //dataTime
        // value.message = convert2HTML(value.message)
        
        //create avatar
        let ava = value.userName
        value.avatar = createAvatar(ava)

        //gửi tín hiệu cho receive-message
        io.in(roomName).emit('receive-message', value)
        console.log(value) 
        save2DB(value, value.room) //thực hiện hàm save2DB
    })
    
    socket.on('join', (value) => { //client -(tín hiệu)-> socket--server -(thực hiện lệnh)-> client
        console.log(value)

        let roomName = generrateRoom(value.room) 
        socket.join(roomName) //socket thực hiện hàm join() 
        io.in(roomName).emit('joined', value)
        console.log(`${value.userName} joined ${value.room}`) 
        getOldDataFromDB(roomName, value.room, value.userName) //thực hiện hàm getOldDataFromDB()
    })
    
    socket.on('leave', (value) => { //client -(tín hiệu)-> socket--server -(thực hiện lệnh)-> client
        io.in(roomName).emit('leaved', value)
        socket.leave(roomName) //socket thực hiện hàm leave()
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) => { //client -(tín hiệu)-> socket--server -(thực hiện lệnh)-> client
        console.log(`${value.userName} typing.....`)
        console.log(value)
        console.log(value.text == '')
        let roomName = generrateRoom(value.room) 
        if(value.text == '') { //nếu giá trị text trong value = rỗng
            io.in(roomName).emit('member_stop_typing', { 
                userName: value.userName
            })    
        } else {
            io.in(roomName).emit('member_typing', {
                userName: value.userName
            })    
        }
    })

    socket.on('disconnect', () => { //client -(tín hiệu)-> socket--server -(thực hiện lệnh)-> client
        console.log('Client disconnected.')
    })
})
app.get('/', (req, res) => { //tạo API localhost:5000/
    res.send('Hello World') //chạy API, nếu hiện Hello World thì server hd
})
server.listen(port, () => {
    console.log(`Server started with port ${port}`)
})

// khai báo database trên API
app.get('/api/room-list',cors() ,(req, res) =>{ 
    pool.connect(function(err, client,done) {
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style;`, function(err, result){
            done()
            if(!err){
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

app.get('/api/room-list/chanels',cors(), (req,res) =>{
    pool.connect(function(err, client, done){
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style and chanels.id_style = 1;`, function(err, result){
            done()
            if(!err){
                res.send({
                    status:200,
                    data:result.rows
                })
            }
        })
    })
})

app.get('/api/room-list/messengers',cors(), (req,res) =>{
    pool.connect(function(err, client, done){
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style and chanels.id_style = 2;`, function(err, result){
            done()
            if(!err){
                res.send({
                    status:200,
                    data:result.rows
                })
            }
        })
    })
})

function convert2Icon(message) {
    return message
        .replace(/\:\)/gi, '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>')
        .replace(/\=\)/gi, '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>')
        .replace(/\:\(/gi, '<span role="image" aria-label="slightly-frowning-face">&#x1f641</span>')
        .replace(/\=\(/gi, '<span role="image" aria-label="slightly-frowning-face">&#x1f641</span>')
        .replace(/\:\'\(/gi, '<span role="image" aria-label="crying-face">&#x1f622</span>')
        .replace(/\:\o/gi, '<span role="image" aria-label="open-mouth">&#x1f62e</span>')
        .replace(/\:\p/gi, '<span role="image" aria-label="stuck-out-tongue">&#x1f61b</span>')
        .replace(":d", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace(":D", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace("=d", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace("=D", '<span role="image" aria-label="smiley">&#x1f603</span>')
        .replace(/\-\_\-/gi, '<span role="image" aria-label="expressionless">&#x1f611</span>')
        .replace(/\^\_\^/gi, '<span role="image" aria-label="smiling-face-smiling-eyes">&#x1f60a</span>')
        .replace(/\:\p/gi, '<span role="image" aria-label="stuck-out-tongue">&#x1f61b</span>')
        .replace(/\:\+1/g, '<i class="em em---1"></i>')
        .replace(/\x\o\x/gi, '<i class="em em-dizzy_face"/>')
        .replace(/\>\_\</g, '<i class="em em-confounded"/>')
        .replace(/\>\</g, '<i class="em em-laughing"></i>')        
}

function createAvatar(userStr) {
    return userStr.substr(0, 2)
}

function convert2HTML(message) {
    return message
        .replace(/\:\)/g, '<i class="em em-slightly_smiling_face"></i>')
        .replace(/\:\(/g, '<i class="em em-disappointed"></i>')
        .replace(/\:d/g, '<i class="em em-smiley"></i>')
        .replace(/\:\+1/g, '<i class="em em-ok_hand"></i>')
}

function save2DB(value, room_id) {
    pool.connect(function(err, client, done) {
        let sql = `insert into histories (username, datat, message, id_chanel) values('${value.userName}', '${value.created}', '${value.message}', '${room_id}');`
        client.query(sql, function(err, result){
            // console.log(result)
            // console.log(err) 
            done()
        })
    })
}

function getOldDataFromDB(roomName, room_id, userName){
    console.log(`histories-${userName}`, roomName)
    pool.connect(function(err, client, done) {
        client.query(`select * from histories where id_chanel = ${room_id}`, function(err, result){
            console.log(result)
            console.log(err)
            done()
            if(!err){
                io.in(roomName).emit(`histories-${userName}`, {
                    room: room_id,
                    userName: userName,
                    rows: result.rows
                })
            }
        })
    })
}

function generrateRoom(roomName, id){
    return `room ${id}`
}