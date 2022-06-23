const express = require('express');

const app = express(); 


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


app.get('/api/courses/:id', (req, res) => {

// req.params.id  returns the string so we first need to parse it to integer 

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) res.status(404).send('The course with the given ID was Not found !!')

res.send(course);

})

// app.get('/api/posts/:year/:month', (req, res) => {

//     res.send(req.query); 
            
//     })


const port = process.env.PORT || 5000 

app.listen(port, ()=>{console.log(`Listening on ${port}`)});
