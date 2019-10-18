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

    socket.on('user-pass', (value) => {
        // console.log(value)
        io.emit(`Examing-${value.userName}-${value.password}`, value)
        saveUser(value.userName, value.password)
    })

    socket.on('type-room', (value)=> {
        // console.log(value)
        let roomId = generrateRoom(value.room)
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(roomId).emit('type-in-room', value)
    })

    socket.on('send-message', (value) => {
        // console.log(value)
        let roomId = generrateRoom(value.room)
        let roomUser = generrateRoom(value.userId)
        // console.log(roomId)
        let msg = value.message
        value.message = convert2Icon(msg)
        value.dat = moment().format('LT')
        value.daday = moment().format('LL')
        let ava = value.userName
        value.avatar = createAvatar(ava)

        let tich = roomId*roomUser
        let tong = Number(roomId)+Number(roomUser)
        // console.log(`receive-message-${tong}-${tich}`)

        if(roomId === roomUser){
            // console.log(`receive-message-${value.userName}`)
            io.in(roomId).emit(`receive-message-${value.userName}`, value)
        }else if(value.typeroom === 'channel'){
            io.in(roomId).emit('receive-message', value)
        }else {
            io.in(roomId).emit(`receive-message-${tong}-${tich}`, value)
            io.in(roomUser).emit(`receive-message-${tong}-${tich}`, value) 
        }
        save2DB(value, value.room)
    })

    socket.on('join', (value) => {
        // console.log(value)
        // console.log(`${value.userName} joined ${value.room}`)
        let roomId = generrateRoom(value.room)
        socket.join(roomId)
        io.in(roomId).emit(`joined-${value.userName}`, value) //send-message
        io.in(roomId).emit('join-in-room', value)
        getOldDataFromDB(roomId, value.userName)
    })

    socket.on('join-userroom', (value) => {
        // console.log(value)
        let roomId = generrateRoom(value.room)
        socket.join(roomId)
        io.in(roomId).emit(`joined-${value.userName}`, value)
        io.in(roomId).emit('join-in-room', value)
        getDataFromUserRoom(roomId, value.userId, value.userName)
    })

    // socket.on('leave', (value) => {
    //     // console.log(value)
    //     // console.log(`${value.userName} leaved`)
    //     io.in(roomId).emit('leaved', value)
    //     socket.leave(roomId)
    // })

    socket.on('typing', (value) => {
        // console.log(value)
        // console.log(value.text == '')
        let roomId = generrateRoom(value.room)
        let roomUser = generrateRoom(value.userId)
        if(value.typeroom === 'channel'){
            // console.log(`${value.userName} typing..... in room ${roomId}`)
            if (value.text == '') {
                // console.log('stop')
                io.in(roomId).emit('member_stop_typing', {
                    userName: value.userName
                })
            } else {
                io.in(roomId).emit('member_typing', {
                    userName: value.userName
                })
            }
        } else {
            // console.log(`${value.userName} typing..... in room ${roomUser}`)
            if (value.text == '') {
                // console.log('stop')
                io.in(roomUser).emit('member_stop_typing', {
                    userName: value.userName
                })
            } else {
                io.in(roomUser).emit('member_typing', {
                    userName: value.userName
                })
            }

        }
    })

    // socket.on('loginn', (value) => {
    //     let userLogin = getDataFromUserRoom(value.roomUser)
    //     if(value)
    // })

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
        let spl = `select users.email, users.password, users.username, rooms.id from users, rooms where (users.email = '${userName}' and users.password = '${password}' and rooms.id_style='2' and rooms.roomname=users.username);`
        // console.log(spl)
        client.query(spl , function (err, result) {
            // console.log(result.rowCount) 
            // console.log(err)
            // console.log(result)
            done()
            if(result.rowCount == '1') {
                // console.log(`userpasstrue${userName}`)
                io.emit(`userpasstrue${userName}`, {
                    rows: result.rows
                })
            } else {
                // console.log(`userpassfalse${userName}`)
                io.emit(`userpassfalse${userName}`)
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
        // console.log(sql)
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
        // console.log(sql)
        client.query(sql, function (err ,result) {
            // console.log(result) //underfined thì xem sql
            // console.log(result.rows)
            // console.log(err) //ra null là đúng
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
        // console.log(sql)
        client.query(sql, function (err ,result) {
            //console.log(result) //underfined thì xem sql
            // console.log(result.rows)
            //console.log(err) //ra null là đúng
            done()
            if (!err) { //err == null
                io.in(room_id).emit(`histories-${userName}`, {
                    userId: user_id,
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
        .replace(/\:\)/gi, '<span role="image" aria-label="slightly-smiling-face"></span>')
}

function createAvatar(userStr) {
    return userStr.substr(0, 2)
}