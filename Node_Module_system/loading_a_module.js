// for loading a module we need the require function and the function take one argument only
// which is name or the path of the target module 

const logger = require('./creating_a_module');

// console.log(logger); it will show what is in the log

logger.log('Hello!');

// the above code shows how we deal with the modules 


// if we just write module.exports = log in the module creating.js file, so in that case we also 
//need to write just : logger('message')



