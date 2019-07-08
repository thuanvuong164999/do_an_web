import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://ee6f4002.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Thuan Vuong'