const fs    = require('fs');
const path  = require('path');

class Ticket {
    constructor( number, desk ) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    init() {
        const {last, last4, tickets, today} = require('../db/data.json');

        if (today === this.today) {
            this.last = last;
            this.today = today;
            this.last4 = last4;
            this.tickets = tickets
        } else {
            this.saveDb()
        }
    }

    saveDb() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJson ));
    }

    next() {
        this.last += 1;
        const tikcet = new Ticket( this.last, null );
        this.tickets.push( tikcet );

        this.saveDb();
        return 'Ticket ' + tikcet.number;
    }

    handleTicket( desk ) {
        // no ticket case 
        if ( this.tickets.length === 0 ) {
            return null;
        }
        const ticket = this.tickets.shift();

        ticket.desk = desk;

        this.last4.unshift( ticket );
        
        if( this.last4.length > 4 ) {
            this.last4.splice(-1,1);
        }

        this.saveDb();

        return ticket;
    }
}


module.exports = TicketControl; 