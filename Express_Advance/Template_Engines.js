//  All the endpoints we have implemented so far we have returned JSON objects in response
//  Sometimes however we need to return html markup to the client and that's why we use
// templating engines  

// There are many template engines used to generate dynamic HTML
// we first need to install pug template engine 

const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const logger = require('./Custom_middleware_function2')
const app = express();


// Then we need to set the view engine of the application 

app.set('view engine', 'pug');
app.set('views', './views') // First point is this is an optional setting it's a default value we dont
//have to set that all your views and templates should be in the views folder which would be on the 
//root of the applcation. 






app.use(helmet())


if(app.get('env') === 'development'){

    app.use(morgan('tiny'));
    console.log('Morgan Enabled...')
}

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

// res.send("Hello from Server!!!" )

res.render('index',{title:'My Express App', message:'Hello from PUG!!!!'})

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
    
