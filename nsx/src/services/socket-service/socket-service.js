import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://431b031d.ngrok.io'
export const socket = socketIOClient(serverEndPoint)
export const userName = 'Thuan Vuong'