const { log } = require("console");

const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketIOConnection = ( socket ) => {
    log('client conected ', socket.id);

    socket.on('disconnect', () => {
        log('Client disconnected ', socket.id)
    });

    socket.on('send-msg', ( payload, callback ) => {

            const id = 12345;
            callback( id );
            socket.broadcast.emit('send-msg', payload);
    });
}

module.exports = {
    socketIOConnection
}