import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://689fc0f4.ngrok.io'

export const socket = socketIOClient(serverEndPoint)