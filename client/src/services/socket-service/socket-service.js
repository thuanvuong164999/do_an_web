import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://4ab5c99d.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Kim Son'
// export const userId = '5'