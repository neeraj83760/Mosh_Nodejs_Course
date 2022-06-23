const config = require('config')
const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const logger = require('./middlewares/Custom_middleware_function2')
const app = express();


app.use(helmet())

// One topic which goes handinhand with Enviourment variable is the topic of storing the
// configuration setting for the application 
// For example : if suppose in developement enviourment u want diffrent database and the mail server 
// so lets see how to set the configuration settings for your application and override them in 
// each enviourment 

// We first need to Install npm config package 

// Configuration

// VVVVVVIMP : You should not keep confidential information like password of ur database or mail server
// in these config files like default,developement prodcution.json ...because this may cause the 
// reason of data breach .. those who has access to your source code repo can steal the passowrd 
// The way we deal with this kind of confidential information is by storing them in enviourment 
// variable 
// You need to write in the terminal :  export password=12345 also to prevent this env variable 
// with another Env variable it;s better to prefix that with the name of our application , for example
// the name of our application is : app

// write on ternmial : export app_password:12345 

console.log('Application Name' + config.get('name'))
console.log('Mail Server' + config.get('mail.host'))

// this statement will read the password from the enviorment variable not for the configuration
// file 
console.log('Mail Password: ' + config.get('mail.password'))


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
    
