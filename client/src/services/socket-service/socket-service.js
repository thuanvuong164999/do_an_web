import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://c6561314.ngrok.io kimson'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Kim Son'
// export const userId = '5'