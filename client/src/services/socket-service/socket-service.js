import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://06063bfd.ngrok.io'

export const socket = socketIOClient(serverEndPoint)