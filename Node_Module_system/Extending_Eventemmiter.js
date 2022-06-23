//  In real world it's very difficult to work with the EventEmmiter directly by directly creating its object 
// Instead u want to create a class that has all the capablities like EventEmmiter
// then we use that class in our Code.

// First u need to open the creation a module file in which we are exporting the a simple function called "log"


const EventEmitter = require('events')
const emmiter = new EventEmitter(); 

var url = 'http://mylogger.io/log'

function log(message){

    // send http request
    
    console.log(`this is the log function and the passed message is: ${message}`)


    // Raise an Event 

    // emmiter.emit('messageLogged', {id:1, url:'http://'});

}   


