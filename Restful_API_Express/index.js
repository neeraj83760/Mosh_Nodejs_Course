// require('express') returns a function we called that express, so express will be treated as 
// function   

// to Install nodemon globally u need to type in the command npm i -g nodemon 

const express = require('express')

const app = express(); // this returns the object of type express by convention we called that object an app 

// app.get()
// app.post()
// app.put()
// app.delete()


//  first argument the app.get() method takes is the path and second is the callback function 
// '/' this represents the root of the website 

// No if blocks for each route like in http module 

app.get('/', (req, res)=>{

res.send("Hello from Server!!!")

})

app.get('/api/courses', (req, res)=>{

res.send([1,2,3,5]) 
    
})

app.listen(3000, ()=>{console.log('Listening on port 3000')})



