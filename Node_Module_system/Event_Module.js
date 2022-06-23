// it checks whether something has happened to the application or not 

// whenever we  called a require function we call the event emmitter class so
// as per the naming convention we need to write it having first letter in uppercase because
// it's not a normal variable it's a class 
// And a class contains a function and properties which we called method 

const EventEmitter = require('events')

// So first we need to create the instance of the EventEmmiter class 

const emmitter = new EventEmitter();

// Most of the times we only use two methods of this EventEmmiter class one is : emit, to raise the event

// emmitter.emit('MessageLogged!!')

// When we raise an event we also need to listner who will listen to that event which is occured 

//  Lets register the listner : on() method is equal to  addListner 
// First argument is : the name of the Event ,  and the sencond one is the callback function 

emmitter.on('MessageLogged!!', ()=>{

    console.log('Listener Called!')
});


emmitter.emit('MessageLogged!!')

