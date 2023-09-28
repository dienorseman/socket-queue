

console.log('Escritorio HTML');

const lblEscritorio = document.querySelector('h1'); 
const btnDispatch = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnDispatch.disabled = false;
});

socket.on('last-ticket', ( last ) => {
    // console.log('last', last);
    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnDispatch.disabled = true;
});

