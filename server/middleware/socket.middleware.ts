import { Socket, Server } from "socket.io";

let listeners: any = []
let io: any = null
let appSocket = {
	emit: (channel: string, message: string) => {
		console.log('Not initiated yet', channel, message)
	}
}

export default defineEventHandler((event) => {
	event.context.appSocket = appSocket

	if (io) return console.log('Initiating socket.middleware')
	const node = event.node
	// @ts-ignore
	io = new Server(node.res.socket?.server)
	io.on('connection', (socket: Socket) => {
		socket.emit('applications', `welcome ${socket.id}`)
		listeners.push({ channel: 'message', socket })

		appSocket.emit = (channel, message) => {
			io.emit(channel, message)
		}

		socket.on('message', (data) => {
			console.log('Relaying again for funsies: ', data)
			io.emit('applications', 'Hello, client! ' + data)
		})

		socket.on('disconnect', () => {
			// Put optional disconnect logic here
		});
	})
})