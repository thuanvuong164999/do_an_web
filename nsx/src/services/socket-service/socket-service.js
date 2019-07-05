import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://008f9448.ngrok.io'
export const socket = socketIOClient(serverEndPoint)
export const userName = 'Thuan Vuong'