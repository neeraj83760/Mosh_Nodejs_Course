const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const logger = require('./Custom_middleware_function2')
const app = express();

// Helmet is the third party middelware function s
app.use(helmet())

// morgan is also the third party middelware function which log the http request on the console
// the argument in the morgan function is defines logged output in the particular format   
app.use(morgan())

app.use(express.json());

// // In the below one line of code we are trying to create our own custom middleware function 
// // Here next is the refrence of the next middleware function in the pipeline 
// app.use(function(req, res, next){

// console.log('Logging.....')
// // consider this middleware function is for logging every request
// // so we perform our logging and then we call the below mentioned function to pass control to the 
// // next middleware function in the pipeline. If we don't do this it means we are not terminating our request response
// // cycle our req will end up hanging....... we can check that as well by commenting the 
// // below mentioned function in the postMAN 

// next();

// })

app.use(logger);  // this is the custom middleware function 


app.use(function(req, res, next){

    console.log('Authentication.....')
    next();
    
    })

// Always remember that middleware functions are called in sequence 
// As per the above example first logging will called and then Authenticating will called 
// whenever u create a custom middleware function keep it seprately in a seprate file, don't include it 
// with your main file  

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
    
