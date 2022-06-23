// When u depoly the application in hosting enviournment the port is dynamically assigned to the 
// aplication so in our code we need to set up the enviourment variable 

// The process object has a golbal property of env so we need to set it accordingly 
// and the third we name our enviournment variable so the competely we name it like process.env.PORT


const express = require('express')

const app = express(); 

app.get('/', (req, res)=>{

res.send("Hello from Server!!!")

})

app.get('/api/courses', (req, res)=>{

res.send([1,2,3,5]) 
    
})

// we can also setup the Enviournment 

const port = process.env.PORT || 3000 

app.listen(port, ()=>{console.log(`Listening on ${port}`)})
