
// For Input calidation we first need to istall joi package.
//  Joi made it very easy to validate the input and return the error message in the 
// simplified way 

const Joi =  require('joi');  // the return from this module is a class that's why we wrote 
// the first letter of assigment variable in capital 

// While using the "JOI" we need to define the schema of the data and it's type and specifications 
//which we are trying to update the database 

const express = require('express');

const app = express();

app.use(express.json());  

const courses = [

    {id:1 , name:"Algorithms"},
    {id:2 , name:"DBMS"},
    {id:3 , name:"C++"},
    {id:4 , name:"Data Structures"}
];


app.post('/api/courses/', (req, res) => {

const schema = {

    name: Joi.string().min(3).required() 
};

const result = Joi.validate(req.body, schema);
// console.log(result);

// When we check the response in postman the details about the error message is too many
// so we need to send the simplified error message to the client so in send(result.error.details[0].message)
// the above method will give the simplified message to the client 

if(result.error)  res.status(400).send(result.error.details[0].message); 

    const course = {
    
        id: courses.length + 1,
        name: req.body.name
    
    }
    
    courses.push(course);
    res.send(course);    
    })

    const port = process.env.PORT || 5000 

    app.listen(port, ()=>{console.log(`Listening on ${port}`)});    
    
