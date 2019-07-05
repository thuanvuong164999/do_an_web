const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)
const moment = require('moment')
const room = 'main'

const pg = require('pg')
const env = require('dotenv').config()

const config={
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
// connect pgsql

const pool = new pg.Pool(config)


io.on('connection', (socket) => {
    console.log('Connectd')
    socket.on('send-message', (value) => {
        console.log(value)
        let msg = value.message
        // value.message = msg.replace(/\:\)/g, '<li class="fas fa-smile"></li>')
        value.message = convert2Icon(value.message)
        value.DaT = moment().format('MMMM Do YYYY, h:mm:ss a') //dataTime
        // value.message = convert2HTML(value.message)
        //create avatar
        let ava = value.userName
        value.avatar = createAvatar(ava)
        //gửi tín hiệu cho receive-message
        io.in(room).emit('receive-message', value)
        // save2DB(value,room)
    })
    
    socket.on('join', (value) => {
        socket.join(room)
        io.in(room).emit('joined', value)
        console.log(`${value.userName} joined`)
        // getOldDataFromDB()
    })
    
    socket.on('leave', (value) => {
        io.in(room).emit('leaved', value)
        socket.leave(room)
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) => {
        console.log(`${value.userName} typing.....`)
        console.log(value)
        console.log(value.text == '')
        if(value.text == '') {
            io.in(room).emit('member_stop_typing', {
                userName: value.userName
            })    
        } else {
            io.in(room).emit('member_typing', {
                userName: value.userName
            })    
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected.')
    })
})
app.get('/', (req, res) => {
    res.send('Hello World')
})
server.listen(port, () => {
    console.log(`Server started with port ${port}`)
})

function convert2Icon(message) {
    return message
        // .replace(/\:\)/gI, '<i class="fas fa-smile"></i>')
        // .replace(/\:\)/gI, '<i class="fas fa-frown"></i>')
        // .replace(/\;\)/gI, '<i class="fas fa-sad-tear"></i>')
        // .replace(/\;\)/gI, '<i class="fas fa-sad-cry"></i>')
        // .replace(/\:\o/gI, '<i class="fas fa-surprise"></i>')
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

// function convert2HTML(message) {
//     return message
//         .replace(/\:\)/g, '<i class="em em-slightly_smiling_face"></i>')
//         .replace(/\:\(/g, '<i class="em em-disappointed"></i>')
//         .replace(/\:d/g, '<i class="em em-smiley"></i>')
//         .replace(/\:\+1/g, '<i class="em em-ok_hand"></i>')
// }

// function save2DB(value, room) {
//     pool.connect(function(err, client, done) {
//         let sql = `insert into chat(sent_by, created_at, message) value(${value.userName}', '${value.create_at}', '${value.message});`
//         client.query(sql, function(err, result){
//             done()
//         })
//     })
// }

// function getOldDataFromDB(socket){
//     pool.connect(function(err, client,done) {
//         client.query(`select * from chat`, function(err, result){
//             done()
//             if(!err){
//                 io.in(room).emit('histories', result.rows)
//                 io.in(room).emit('joined', value)

//             }
//         })
//     })
// }