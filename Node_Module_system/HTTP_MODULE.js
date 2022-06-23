// We use this module for the networking applications
//For example : we can create a webserver which listen for HTTP requests on a given port
// With this we can easily create the backend service for our Client appications 

const http = require('http')

// VVVVVVVVVIMP : usually we dont use this kind of apporach to create the backend service 
// Because we need to write too much of if statements for the each route .... We use express framework for this
// which gives the application a clean structure to handle various routes ....by the way internally 
// express is also built on the top of the HTTP module 
 

const server = http.createServer((req,res)=>{

if(req.url === '/')
{
    res.write('Hello World!!');
    res.end();
}

//  Another route is given below : Suppose we want to return the list of courses from the Database
// And the list of courses are array of object which we want to return to client so for that
// we use JSON

if(req.url === '/api/courses'){

res.write(JSON.stringify([1, 2, 44, 5 ,6 , 7]))
res.end();

}

})
//  The Intersting part is the server is the Event Emmiter so it has all the capablities of EventEmmiter 
// That we saw earlier in the section ... so when we write server.on() , server.addListner 
// We have all the methods which the EventEmmiter has 


// In real world application we dont respoond to connection event to build an HTTP service 
// this is very low level so what we commonly do, we pass a callback function in the createServer()
// method.  In the callback function Instead of working with socket we can work with the actual 
// request or response objects 



// server.on('connection', (socket)=>{

//     console.log('New Connection!!') 
    
//     var url = 'http://mylogger.io/log'

//     function log(message){
    
//         // send http request
        
//         console.log(`this is the log function and the passed message is: ${message}`)
    
//     }       
// });

// before listening on particualr port me need to register the listner or handler 
server.listen(3000);

console.log('listening on port 3000')



