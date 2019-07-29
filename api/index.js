const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)  // tên biến(thích j để đó) = tạo trên server 1 socket
const moment = require('moment')
const pg = require('pg')
const mongoose = require('mongoose')
const room = 'main'
const cors = require('cors')
const env = require('dotenv').config()

// io.on: đón nhận tín hiệu, io.off: ngắt kết nối, khử

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
console.log(config)

const pool = new pg.Pool(config)

// mongoose.connect('mongodb://localhost/chat', function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Connected to mongodb')
//     }

// })

app.use(cors())

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('send-message', (value) => {
        //convert Emoji 
        let msg = value.message
        let roomName = generrateRoom(value.room)
        value.message = convert2Icon(msg)
        value.DaT = moment().format('DD/MM/YYYY, HH:mm:ss');
        //Create avatar for user by userName
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(room).emit('receive-message', value)
        save2DB(value, value.room)
    })
    // console.log(socket)
    //tạo cầu nối server để nhận tín hiệu

    //các action gửi cho client
    socket.on('join', (value) => {
        let roomName = generrateRoom(value.room)
        socket.join(room)
        io.in(room).emit('joined', value)
        console.log(`${value.userName} joined ${value.room}`)
        getHistories(roomName, value.room)
    })

    socket.on('leave', (value) => {
        io.in(room).emit('leaved', value)
        socket.leave(room)
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) => {
        console.log(`${value.userName} typing.....`)
        // console.log(value)
        // console.log(value.text == '')
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

app.get('/api/room-list', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query('select * from room', function(err, result) {
            done()
            if(!err) {
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

server.listen(port, () => {
    console.log(`Server started with port ${port}`)
})

//Convert Emoji function
function convert2Icon(messages) {
    return messages
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

//Convert avatar function

function save2DB(value, room_id) {
    pool.connect(function(err, client, done) {
        let sql = `insert into chat (sent_by, created_at, message, room_id) values ('${value.userName}', '${value.create_at}', '${value.message}', '${room_id}')`
        client.query(sql, function(err, result) {
            done()
            console.log(result)
            console.log(err)
        })
    })
}

function getHistories(roomName, room_id, userName) {
    pool.connect(function(err, client, done) {
        client.query(`select * from chat where room_id = ${room_id}` , function(err, result) {
            done()
            if(!err) {
                io.in(room).emit(`histories-${userName}`, {
                    room: room_id,
                    userName: userName,
                    rows: result.rows
                })
                
            }
        })
    })
}

function generrateRoom(id) {
    return `room ${id}`
}

function createAvatar(userStr) {
    return userStr.substr(0, 2)
}