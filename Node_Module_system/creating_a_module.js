const EventEmitter = require('events')
const emmiter = new EventEmitter(); 

var url = 'http://mylogger.io/log'

function log(message){

    // send http request
    
    console.log(`this is the log function and the passed message is: ${message}`)

}   

emmiter.emit('messageLogged', {id:1, url:'http://'});


// the above function and variable are local to this module or we can 
// say private to this module we cant access it outside this file 
// to access the respective function outside this file or module we need to export it 
// actaully export is an property of the module object you can check the same 
// by writing the below mentioned statment
// console.log(module)

// If we want to export the function and variable of the specific function then we
// we need to write the below mentioned line of code 

// module.exports.log  till this code statement we are adding the log (u can also give any other name to this like "exportinglog"  etc  )method 
//to the exports object , and then later we will write the below line of code 

// module.exports.log = log   here we are simply setting it to log function which is mentioned in 
// this .js file 

// to export the url u need to write the below line of code 

// module.exports.url = url; 

// console.log(module.exports.log) 


module.exports.log = log 

//  Key point : we don't nesscarily need the object when we only have a single method in
// the js file we can also write it as ... so instead of exporting the object we can
// export the single function .... we need to do the modification in the js file where
// we are loading this module 

// module.exports = log 