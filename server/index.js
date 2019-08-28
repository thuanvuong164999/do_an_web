const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)

const moment = require('moment')
const cors = require('cors')

const pg = require('pg')
const env = require('dotenv').config()
const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}
const pool = new pg.Pool(config)
// console.log(config) //kiểm tra connect database

app.use(cors())

io.on('connection', (socket) => {
    console.log('Connected')

    socket.on('login-chat', (user) => {
        console.log(user)
        io.emit('login-chat1', user)
    })

    socket.on('user-pass', (value) => {
        // console.log(value)
        saveUser(value.userName, value.password)
    })

    socket.on('type-room', (value)=> {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(roomName).emit('type-in-room', value)
    })

    socket.on('send-message', (value) => {
        console.log(value)
        let roomName = generrateRoom(value.room)
        let roomUser = generrateRoom(value.userId)
        console.log(roomName)
        let msg = value.message
        value.message = convert2Icon(msg)
        value.dat = moment().format('LT')
        value.daday = moment().format('LL')
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(roomName).emit('receive-message', value)
        // if(roomName === roomUser){
        //     io.in(roomName).emit('receive-message', value)
        // } else {   
        //     io.in(roomName).emit('receive-message', value)
        //     io.in(roomUser).emit('receive-message', value) 
        // }
        save2DB(value, value.room)
    })

    socket.on('join', (value) => {
        // console.log(value)
        // console.log(`${value.userName} joined ${value.room}`)
        let roomName = generrateRoom(value.room)
        socket.join(roomName)
        io.in(roomName).emit('joined', value) //send-message
        io.in(roomName).emit('join-in-room', value)
        getOldDataFromDB(roomName, value.userName)
    })

    socket.on('join-userroom', (value) => {
        let roomName = generrateRoom(value.room)
        socket.join(roomName)
        io.in(roomName).emit('joined', value)
        io.in(roomName).emit('join-in-room', value)
        getDataFromUserRoom(roomName, value.userId, value.userName)
    })

    socket.on('leave', (value) => {
        // console.log(value)
        console.log(`${value.userName} leaved`)
        io.in(roomName).emit('leaved', value)
        socket.leave(roomName)
    })

    socket.on('typing', (value) => {
        // console.log(value)
        // console.log(`${value.userName} typing.....`)
        // console.log(value.text == '')
        let roomName = generrateRoom(value.room)

        if (value.text == '') {
            io.in(roomName).emit('member_stop_typing', {
                userName: value.userName
            })
        } else {
            io.in(roomName).emit('member_typing', {
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

app.get('/api/user-password', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select * from users;`, function (err, result) {
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

// app.post('/api/login', cors(), (req, res) => {
//     console.log(req.body.user, req.body.pass)
//     pool.connect(function (err, client, done) {
//         let sql = `select * from users where (users.email = '${userName}' and users.password = '${password}');`
//         client.query(sql, function (err, result) {
//             done()
//             if(!err){
//                 res.send({
//                     status: 200,
//                     data: result.rows
//                 })
//             }
//         })
//     })
// })

function saveUser(userName, password) {
    pool.connect(function (err, client, done) {
        let spl = `select * from users where (users.email = '${userName}' and users.password = '${password}');`
        // console.log(spl)
        client.query(spl , function (err, result) {
            // console.log(result.rowCount) 
            // console.log(err)
            done()
            if((userName === '') || (password === '')){ 
                io.emit('no-input')
            } else if(result.rowCount == '1') {
                io.emit('user-pass-true', {
                    rows: result.rows
                })
            } else {
                io.emit('user-pass-false')
            }
        })
    })
}

app.get('/api/room-list', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select rooms.name, rooms.id, chanelstyles.style from rooms, chanelstyles where chanelstyles.id = rooms.id_style;`, function (err, result) {
            done()
            if (!err) {
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

app.get('/api/room-list/chanels', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select rooms.roomname, rooms.id from rooms where rooms.id_style = '1';`, function (err, result) {
            done()
            if (!err) {
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

app.get('/api/room-list/user-rooms', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select rooms.roomname, rooms.id, users.user_id from rooms, users where (rooms.id_style = '2') and (rooms.roomname = users.username);`, function (err, result) {
            done()
            if (!err) {
                res.send({
                    status: 200,
                    data: result.rows
                })
            }
        })
    })
})

function save2DB(value, room_id) {
    pool.connect(function (err, client, done) {
        let sql = `insert into histories (username, user_id, datime, message, room_id) values('${value.userName}', '${value.userId}', '${value.dat}', '${value.message}', '${room_id}')`
        client.query(sql, function (err, result) {
            // console.log(result)
            // console.log(err) 
            done()
        })
    })
}

function getOldDataFromDB(room_id, userName) {
    pool.connect(function (err, client, done) {
        // console.log(`histories-${userName}`, room_id)
        let sql = `select * from histories where room_id = '${room_id}';`
        console.log(sql)
        client.query(sql, function (err ,result) {
            //console.log(result) //underfined thì xem sql
            // console.log(result.rows)
            //console.log(err) //ra null là đúng
            done()
            if (!err) { //err == null
                io.in(room_id).emit(`histories-${userName}`, {
                    room: room_id,
                    userName: userName,
                    rows: result.rows
                })
            }
        })
    })
}

function getDataFromUserRoom(room_id, user_id, userName) {
    pool.connect(function (err, client, done) {
        let sql = `select * from histories where (user_id = '${user_id}' and room_id = '${room_id}') or (user_id = '${room_id}' and room_id = '${user_id}');`
        console.log(sql)
        client.query(sql, function (err ,result) {
            //console.log(result) //underfined thì xem sql
            // console.log(result.rows)
            //console.log(err) //ra null là đúng
            done()
            if (!err) { //err == null
                io.in(room_id).emit(`histories-${userName}`, {
                    room: room_id,
                    userName: userName,
                    rows: result.rows
                })
            }
        })
    })
}

function generrateRoom(id) {
    return `${id}`
}

function convert2Icon(message) {
    return message
        .replace(/\:\)/gi, '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>')
}

function createAvatar(userStr) {
    return userStr.substr(0, 2)
}