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

    socket.on('appear-list1', (value) => {
        io.emit('open-list1', value)
    })

    socket.on('appear-list2', (value) => {
        io.emit('open-list2', value)
    })

    socket.on('off-info-room', (value) => {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        io.in(roomName).emit('off-info', value)
    })

    socket.on('info-room', (value) => {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        io.in(roomName).emit('info-in-room', value)
    })

    socket.on('type-room', (value)=> {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(roomName).emit('type-in-room', value)
    })

    socket.on('join-room',(value) => {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        io.in(roomName).emit('join-in-room', value)
    })

    socket.on('send-message', (value) => {
        // console.log(value)
        let roomName = generrateRoom(value.room)
        let msg = value.message
        value.message = convert2Icon(msg)
        value.dat = moment().format('LTS')
        value.daday = moment().format('LL')
        let ava = value.userName
        value.avatar = createAvatar(ava)
        io.in(roomName).emit('receive-message', value)
        save2DB(value, value.room)
    })

    socket.on('join', (value) => {
        // console.log(value)
        console.log(`${value.userName} joined ${value.room}`)
        let roomName = generrateRoom(value.room)
        socket.join(roomName)
        io.in(roomName).emit('joined', value)
        getOldDataFromDB(roomName, value.userName)
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

app.get('/api/room-list', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style;`, function (err, result) {
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
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style and chanels.id_style = 1;`, function (err, result) {
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

app.get('/api/room-list/messengers', cors(), (req, res) => {
    pool.connect(function (err, client, done) {
        client.query(`select chanels.name, chanels.id, style_chanels.style from chanels, style_chanels where style_chanels.id = chanels.id_style and chanels.id_style = 2;`, function (err, result) {
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
        let sql = `insert into histories (username, dat, message, id_chanel) values('${value.userName}', '${value.dat}', '${value.message}', '${room_id}')`
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
        let sql = `select * from histories where id_chanel = '${room_id}'`
        // console.log(sql)
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