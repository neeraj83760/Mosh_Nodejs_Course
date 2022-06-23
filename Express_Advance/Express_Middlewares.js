// Middleware function is a function which takes a request object and either return the 
// response to the client or passes control to the other middleware function 

// we have already seen examples of middleware functions : 1) Route handler function so 
// in express every route handler function we have is technically a middleware function 
// because it takes the request object and it returns res.send to the client so it 
// terminates the req res cycle 

const Joi =  require('joi'); 
const express = require('express');

const app = express();

// the below line of code is another example of middleware function so when we call express.json
// method this method returns a function which is a middleware function 
// the job of this middleware function is to read the request and if there is a json object in the
// in the body of the request it will parse the body of the object into a json object and then it 
// will set req.body 

// An express applcation is nothing but the bunch of middleware functions 
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

app.get('/api/courses/:id', (req, res) => {

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) return res.status(404).send('The course with the given ID was Not found !!')

res.send(course);

})


app.post('/api/courses/', (req, res) => {

    const {error} = validateCourse(req.body); 
    
    if(error) return res.status(400).send(error.details[0].message);
     
    const course = {
    
        id: courses.length + 1,
        name: req.body.name
    
    }
    
    courses.push(course);
    res.send(course);    
    })


app.put('/api/courses/:id',(req, res)=>{

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) {
res.status(404).send('The course with the given ID was Not found !!')
return;
}

const {error} = validateCourse(req.body); 

if(error){  
res.status(400).send(error.details[0].message);
return; 
}

course.name = req.body.name;

res.send(course);


})

function validateCourse(course){

    const schema = {

        name: Joi.string().min(3).required() 
    };
    
    return Joi.validate(course, schema);    

}

app.delete('/api/courses/:id',(req , res)=>{

// Look up the course
// Not existing, return 404

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) return res.status(404).send('The course with the given ID was Not found !!')

// Delete 
// Before deleting the course we need to find the Index of the course first in our Courses array

const index = courses.indexOf(course);
// we go to that index which we want to delete and then remove 1 object 
courses.splice(index, 1); 

// Return the same course 

res.send(course); 

})



    const port = process.env.PORT || 5000 

    app.listen(port, ()=>{console.log(`Listening on ${port}`)});    
    


