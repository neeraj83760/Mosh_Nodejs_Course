// More interprise level application u need to know on what enviourment your code is running on 
// Is this is development env or production enviourment because u need to enable or disable
// certain features based on the current enviourment 

//  Suppose we want logging the http request on the basis of "app.use(morgan(tiny))" only in the 
// developement enviourment not on the production enviourment 



const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const logger = require('./Custom_middleware_function2')
const app = express();

// The Process object is a global object in the Node it has a env property which gives enviourment
// variable 

// The below two lines of code is to get the current enviournment variable like wether it is set or not
// console.log(`NODE_ENV : ${process.env.NODE_ENV}`)
// the below console statmtn will log the default enviourment variable  
// console.log(`app: ${app.get('env')} `)

// Helmet is the third party middelware function s
app.use(helmet())

// morgan is also the third party middelware function which log the http request on the console
// the argument in the morgan function is defines logged output in the particular format

// If the enviournment of the application is development will display accordigly

if(app.get('env') === 'development'){

    app.use(morgan('tiny'));
    console.log('Morgan Enabled...')
}

// just change the env variable and then check how the above if statemnts work 
// write export NODE_ENV=production in the terminal and restart the sever than check
// u will not see the 'MOrgan enabled' logged statemnt becuase we have changed the env
// variable to production 

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
    
