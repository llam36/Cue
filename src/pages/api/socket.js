import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(3001, {
            cors: {
                origin: "*"
            }
        })
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('queue-change', queue => {
                socket.broadcast.emit('update-queue', queue)
            })
            socket.on('swap-change', swap => {
                socket.broadcast.emit('update-swap', swap)
                console.log(swap.length)
            })
        })
    }
    res.end()
}

export default SocketHandler