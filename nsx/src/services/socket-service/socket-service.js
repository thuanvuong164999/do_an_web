import socketIOClient from 'socket.io-client'

const socket = socketIOClient('localhost:5000')

export default socket