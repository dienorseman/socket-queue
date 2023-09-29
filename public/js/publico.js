// html refs lblTikcet 1 - 4, lblEscritorio 1 - 4 
const lblT1 = document.querySelector('#lblTicket1')
const lblT2 = document.querySelector('#lblTicket2')
const lblT3 = document.querySelector('#lblTicket3')
const lblT4 = document.querySelector('#lblTicket4')

const lblE1 = document.querySelector('#lblEscritorio1')
const lblE2 = document.querySelector('#lblEscritorio2')
const lblE3 = document.querySelector('#lblEscritorio3')
const lblE4 = document.querySelector('#lblEscritorio4')


const socket = io()

socket.on('current-status', ( payload ) => {
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload
    if (ticket1) {
        lblT1.innerText = `Ticket ${ticket1.number}`
        lblE1.innerText = `Escritorio ${ticket1.desk}`
    }
    if (ticket2) {
        lblT2.innerText = `Ticket ${ticket2.number}`
        lblE2.innerText = `Escritorio ${ticket2.desk}`
    }
    if (ticket3) {
        lblT3.innerText = `Ticket ${ticket3.number}`
        lblE3.innerText = `Escritorio ${ticket3.desk}`
    }
    if (ticket4) {
        lblT4.innerText = `Ticket ${ticket4.number}`
        lblE4.innerText = `Escritorio ${ticket4.desk}`
    }
})