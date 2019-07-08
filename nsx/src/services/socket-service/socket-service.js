import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://48db37dc.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Thuan Vuong'