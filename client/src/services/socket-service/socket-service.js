import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://92fed2b5.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Vuong Dung Thuan'