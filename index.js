const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)
const moment = require('moment')

const pg = require('pg')
const env = require('dotenv').config()

const config={
    user: postgres.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
// connect pgsql

const pool = new pg.Pool(config)


const room = 'main'
io.on('connection', (socket) => {
    console.log('Connectd')
    socket.on('send-message', (value) => {
        console.log(value)
        let msg = value.message
        // value.message = msg.replace(/\:\)/g, '<li class="fas fa-smile"></li>')
        // value.message = convert2Icon(value.message)
        value.message = convert2HTML(value.message)
        value.avatar = createAvatar(value.userName)
        value.create_at = moment().format('MMMM Do YYYY, h:mm:ss a')
        io.in(room).emit('receive-message', value)
        save2DB(value,room)
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

// function convert2Icon(message) {
//     return message
//         .replace(/\:\)/gI, '<i class="fas fa-smile"></i>')
//         .replace(/\:\)/gI, '<i class="fas fa-frown"></i>')
//         .replace(/\;\)/gI, '<i class="fas fa-sad-tear"></i>')
//         .replace(/\;\)/gI, '<i class="fas fa-sad-cry"></i>')
//         .replace(/\:\o/gI, '<i class="fas fa-surprise"></i>')
// }

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

function save2DB(value, room) {
    pool.connect(function(err, client, done) {
        let sql = `insert into room(messenger, created_at, message) value(${value.userName}', '${value.create_at}', '${value.message});`
        client.query(sql, function(err, result){
            done()
        })
    })
}

// function getOldDataFromDB(value, room){
//     pool.connect(function(err, client,done) {
//         let sql = `select * from room;`
//         client.query(sql, function(err, result) {
//             done()
//         })
//     })
// }