import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://f03cc9d4.ngrok.io' 
export const socket = socketIOClient(serverEndPoint)
export const userName = 'Kim Son'