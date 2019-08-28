import socketIOClient from 'socket.io-client'

//khai báo các biến không đổi và sử dụng thường xuyên
export const serverEndPoint = 'http://7ae88c05.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'vuong dung thuan'
export const userId = '4'
// export const userName = 'minh hoang'
// export const userId = '6'
// export const userName = 'kim son'
// export const userId = '5'



