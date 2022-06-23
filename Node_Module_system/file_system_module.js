const fs = require('fs')

// as we have sync and async functions in fs module but we should avoid using sync function 

// const files = fs.readdirSync('./')

// console.log(files)

// async function for readdir function , The async function takes second argument as a callback function 
// which takes an error and the other argument it 

fs.readdir('./', (err, files) => {

if(err) console.log('Error', err);

else console.log('Result', files)

})



