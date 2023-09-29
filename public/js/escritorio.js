console.log('Escritorio HTML');

const lblEscritorio = document.querySelector('h1');
const btnDispatch = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

const lblPendientes = document.querySelector('#lblPendientes');

divAlert.style.display = 'none';

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnDispatch.disabled = false;
});

socket.on('pending-tickets', (payload) => {
    console.log(payload);
    if (payload === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = payload;
        divAlert.style.display = 'none';
    }
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnDispatch.disabled = true;
});

btnDispatch.addEventListener('click', () => {
    socket.emit('dispatch-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return (divAlert.style.display = '');
        }

        lblTicket.innerText = `Ticket ${ticket.number}`;
    });
});
