
const { Server } = require('socket.io')

class socketHandler {
    constructor(){
        this.io = null
        this.connectedSocket = new Map()
    }

    initSocket(server , corsConfig){
        this.io = new Server(server , { cors:corsConfig })
    }

    socketConection(){
        this.io.on('connection' , (socket) => {
            console.log('Socket Connected')

            //update connected Sockets
            this.connectedSocket.set(socket.id , socket)
        })
    }

    disconnectSocket(socketId){
        const socket = this.connectedSocket.get(socketId)
        if(socket){
            socket.disconnect(true)
            this.connectedSocket.delete(socketId)
            console.log('socket disconnected')
        }
    }

    getIO() {
        if (!this.io) {
            throw new Error('Socket.io not initialized. Call initSocket first.');
        }
        return this.io;
    }
}


module.exports = new socketHandler();
