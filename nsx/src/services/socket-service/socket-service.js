import socketIOClient from 'socket.io-client'

export const serverEndPoint = 'http://3742513f.ngrok.io'

export const socket = socketIOClient(serverEndPoint)
export const userName = 'Thuan Vuong'