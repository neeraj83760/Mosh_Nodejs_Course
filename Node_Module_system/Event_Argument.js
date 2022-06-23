const EventEmitter = require('events')

const emmitter = new EventEmitter();


emmitter.on('MessageLogged!!', (arg)=>{

    console.log('Listener Called!', arg)
});


// To send the information about the Event occured we can send it as an argument in the emit method
// we can pass the argument as an object


emmitter.emit('MessageLogged!!', {id:1 , url: 'http://'})



