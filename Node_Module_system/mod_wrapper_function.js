var url = 'http://mylogger.io/log'

function log(message){

    // send http request
    
    console.log(`this is the log function and the passed message is: ${message}`)

}   

console.log(__filename);
console.log(__dirname);

//  Keypoint : Node does not execute our code directly it always wraps the code in each module inside 
// the immideately invoked function :  example given below :

(function(exports, require, module, __filename, __dirname){
   
    


    var url = 'http://mylogger.io/log'

    function log(message){
    
        // send http request
        
        console.log(`this is the log function and the passed message is: ${message}`)
    
    }   


})



