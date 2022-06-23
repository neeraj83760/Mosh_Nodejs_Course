//  just like we have app.use(express.json()) middleware function in the same way we have
//  app.use(express.urlencoded()) as a result of "express.urlencoded()" a middleware function will
// be returned 
//

const Joi =  require('joi'); 
const express = require('express');
const logger = require('./Custom_middleware_function2')
const app = express();

app.use(express.json());
//  the below line of code is also a middleware function 
// the below middleware function parses incoming request with url encoded payloads, that is
// is the reqest with the body like this key=value&key=value

// so if u have the html form input fields and post that form to the server the body of the req
// look like "key=value&key=value" ..... want to test this open the postman and select the post request
// in the drop down list paste url "http://localhost:5000/api/courses" select the body tab and
// select the "x-www-form-urlencoded" and enter the key and value accordingly that key value
// with be concatenated with the url and then the req will be sent to the server 

// In terminal u will get an error : body-parser deprecated undefined extended:provide extended 
// so in order to fix this we need to pass an object "extended:true" in urlencoded function
// with this we can pass arrays and complex objects using the url encoded format  

app.use(express.urlencoded({extended:true})) 

// The last builtin middleware function in express is static and we use that to serve the
// static files .. the argument we pass in the static function is a folder where we keep
// our css and images in this folder            

app.use(express.static('public'))

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
    

