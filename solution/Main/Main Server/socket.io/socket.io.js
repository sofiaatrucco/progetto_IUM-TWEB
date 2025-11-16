// Initializes the socket.io events.
exports.init = (io) => {
    // Handles new socket connections.
    io.on('connection', (socket) => {

        // Listens for 'chat message' events from the client.
        socket.on('chat message', (room, msg, name) => {
            try {
                // Joins the specified room.
                socket.join(room);
                // Broadcasts the message to all clients in the room.
                io.to(room).emit('chat message', msg, name);
            } catch (error) {
                console.error('error in function chat message:', error);
            }
        });

        // Listens for 'create or join conversation' events from the client.
        socket.on('create or join conversation', (room, name) => {
            // Joins the specified room.
            socket.join(room);
            // Broadcasts the 'create or join conversation' event to all clients in the room.
            io.to(room).emit('create or join conversation', name); // Broadcast the message to all connected clients
        });

        // Listens for 'leave room' events from the client.
        socket.on('leave room', (room, name) => {
            // Joins the room before broadcasting the leave message.
            socket.join(room);
            // Broadcasts the leave message to all clients in the room.
            io.to(room).emit('chat message', "has left the conversation", name);
            // The user leaves the room.
            socket.leave(room);
        });

        // Handles the disconnection of a user.
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
