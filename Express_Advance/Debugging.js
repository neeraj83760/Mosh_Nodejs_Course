// The better way to console.log messages for the purpose of debugging 
// we can directly use 'debug' package for this 

// You first need to npm Install the debug package 
// With debug package we can replace all the console.log statments which we were
// using for debugging purposes we will replace it with the call to a debug function 
// and then we can use an enviourment variable to enable and disable debugging 
// so for that we don't need to comeback to our code and modify all the console.log 
// statements which we are using for the debugging purposes  require('debug') returns a function
// we call require('debug') this function and give it an arbitary namespace 'app:startup' that 
// we define for debugging for example namespace 'app:startup'

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')

const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const logger = require('./Custom_middleware_function2')
const app = express();

app.use(helmet())

if(app.get('env') === 'development'){

    app.use(morgan('tiny'));
    // console.log('Morgan Enabled...')
    startupDebugger('Morgan Enabled..!!')
}

// Suppose we did the database work so we we write the debugger function accordingly
// You need to write : "export DEBUG=app:startup" in terminal and this will print
// app:startup Morgan Enabled!!  in the terminal but if we write "export DEBUG="
// in the terminal than if condition will not get true 

// Suppose we want to see debug message for multiple namespaces you need to write in the
// terminal : export DEBUG=app:startup,app:db

// for all the debugging messages we need to set the enviournment variable : export DEBUG=app:*

// There is also a faster way to set the level of debugging we want to see so we don't want 
// explictly set the enviournemt variable using the export command . We can set the 
// env variable at the time of running the application 

// DEBUG=app:db nodemon Debugging.js

dbDebugger('Connected to the Database !!!')

app.use(express.json());

app.use(logger);  // this is the custom middleware function 


app.use(function(req, res, next){

    console.log('Authentication.....')
    next();
    
    })


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

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) return res.status(404).send('The course with the given ID was Not found !!')

const index = courses.indexOf(course);

courses.splice(index, 1); 
 
res.send(course); 

})



    const port = process.env.PORT || 5000 

    app.listen(port, ()=>{console.log(`Listening on ${port}`)});    
    
