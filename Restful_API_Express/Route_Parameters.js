const express = require('express');

const app = express(); 

app.get('/', (req, res)=>{

res.send("Hello from Server!!!")

})

app.get('/api/courses', (req, res)=>{

res.send([1,2,3,5]); 
    
})

// In order to get the single courses from above list of courses we also need to mention the ID as well
// so our url endpoint should be like  '/api/courses/:id' .... here id is the name of the parameter
// u can write anything here 

app.get('/api/courses/:id', (req, res) => {

res.send(req.params.id); 
        
})

// It's possible that we have multiple parameters in a route, for example u are building a service 
// suppose u are building a service for powering the blog so we could have the route like mentioned
// below  
// year and month property in the URL  
 
// app.get('/api/posts/:year/:month', (req, res) => {

//     res.send(req.params); // req.params is an object which will be sent form the server 
            
//     })

// Another types of parameter are called query string parameter: these are the parameters 
// which we can add in the URL after the question mark
// query parameters stored in the object in the form of key value pair

app.get('/api/posts/:year/:month', (req, res) => {

    res.send(req.query); 
            
    })

// Example : we want to get all the posts of janurary 2018 and sort them by there name 

// example : localhost:3000/api/posts/2018/1?sortBy=name 

// Use query string parameters to provide additional data for the backend services 

// VVVVVIMP :   we use route parameters for essential or required values but query string parameters
// is for anything that's is optional 

// we can also setup the Enviournment 

const port = process.env.PORT || 5000 

app.listen(port, ()=>{console.log(`Listening on ${port}`)});
