const Joi =  require('joi'); 
const express = require('express');

const app = express();

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

// req.params.id  returns the string so we first need to parse it to integer 

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) res.status(404).send('The course with the given ID was Not found !!')

res.send(course);

})


app.post('/api/courses/', (req, res) => {

    const {error} = validateCourse(req.body); // In this case we only want the error property so this is 
    // equivalent to result.error // this is called object destructuring 
    
    if(error){  
    res.status(400).send(error.details[0].message);
    return; 
    }

    const course = {
    
        id: courses.length + 1,
        name: req.body.name
    
    }
    
    courses.push(course);
    res.send(course);    
    })


app.put('/api/courses/:id',(req, res)=>{

    // PHASE : 1 
// First we need to look up the course
// if course doesn't exist we return the 404 error

const course = courses.find(c => c.id === parseInt(req.params.id))

if(!course) res.status(404).send('The course with the given ID was Not found !!')

// PHASE : 2
// validate the course
// if invalid, we need to return 400 error - Means Bad request 

// const schema = {

//     name: Joi.string().min(3).required() 
// };

// const result = Joi.validate(req.body, schema);

//  The validateCourse(req.body) target object has two properties error and value so 
// here we can apply the object destructuring for the below line of code 


const {error} = validateCourse(req.body); // In this case we only want the error property so this is 
// equivalent to result.error // this is called object destructuring 

if(error){  
res.status(400).send(error.details[0].message);
return; 
}

// PHASE : 3
// If everything is fine we'll update the course

course.name = req.body.name;

 //  PHASE: 4
// Return the updated course to the client 

res.send(course);


})

// Can we make a reusable function for the validation logic which we can use in diffrent
// crud operations , lets try 

function validateCourse(course){

    const schema = {

        name: Joi.string().min(3).required() 
    };
    
    return Joi.validate(course, schema);    

}


    const port = process.env.PORT || 5000 

    app.listen(port, ()=>{console.log(`Listening on ${port}`)});    
    

