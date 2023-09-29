
const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('last-ticket', ticketControl.last);

    socket.emit('current-status', ticketControl.last4);

    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
        callback(next);
    });


    socket.on('dispatch-ticket', ({ escritorio: desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            });
        }

        const ticket = ticketControl.handleTicket(desk);

        socket.broadcast.emit('current-status', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }
    });
};

module.exports = {
    socketController,
};
