import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://fe314117.ngrok.io'

export const socket = socketIOClient(serverEndPoint)