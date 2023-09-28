console.log('Nuevo Ticket HTML');

const newTicketLabel = document.querySelector('#lblNuevoTicket');
const createBtn = document.querySelector('button');


const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    createBtn.disabled = false;
});

socket.on('last-ticket', ( last ) => {
    // console.log('last', last);
    newTicketLabel.innerText = 'Ticket ' + last;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    createBtn.disabled = true;
    newTicketLabel.innerText = 'Desconectado';
});


createBtn.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        console.log('From server: ', ticket );
        newTicketLabel.innerText = ticket;
    });
});