const express = require('express');

const app = express();

// in order to req.body.name this line to work we need to enable the parsing of json objects
// in the body of the request because by default this feature is not enabled in express 
// for enabling it we need to write the below line of code 
//  In the below line of code we are kind of adding a peice of middleware : so when we call
// express.json() the json method return the peice of middleware and then we call app.use  
// to use that middleware in the request processing pipeline 

app.use(express.json());  

const courses = [

    {id:1 , name:"Algorithms"},
    {id:2 , name:"DBMS"},
    {id:3 , name:"C++"},
    {id:4 , name:"Data Structures"}
];

app.get('/', (req, res)=>{

res.send("Hello from Server!!!" )

})

app.get('/api/courses', (req, res)=>{

res.send(courses); 
    
})

// we are posting to the collection of courses that's why we have used the plural name "courses" here 
app.post('/api/courses/', (req, res) => {

const course = {

    id: courses.length + 1,
    // In this implementation we have assumed that there is an object with the .name property in the
    // req.body of the request, what if the client forget to send this property or send an Invalid name
    // that's where input validation comes into picture ... which is next lecture 
    name: req.body.name

}

courses.push(course);
//  when we post an object to the server the server creates a new object for new resource it should
// return then object in the body of the response 
// the reason for the below line of code is we are assiging the ID " id: courses.length + 1" on the
// server so we need to return the course object ot the client because the chances are the client
// needs to know the id of this new object  
res.send(course);    
})

const port = process.env.PORT || 5000 

app.listen(port, ()=>{console.log(`Listening on ${port}`)});
