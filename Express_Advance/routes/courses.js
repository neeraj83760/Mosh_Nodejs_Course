const express = require('express');
// Diffrence is that in this module instead of working with app object we are 
// working with router object 

const router = express.Router();

const courses = [

    {id:1 , name:"Algorithms"},
    {id:2 , name:"DBMS"},
    {id:3 , name:"C++"},
    {id:4 , name:"Data Structures"}
];

router.get('/', (req, res)=>{

    res.send(courses); 
        
    })
    
    router.get('/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id))
    
    if(!course) return res.status(404).send('The course with the given ID was Not found !!')
    
    res.send(course);
    
    })
    
    
    router.post('/', (req, res) => {
    
        const {error} = validateCourse(req.body); 
        
        if(error) return res.status(400).send(error.details[0].message);
         
        const course = {
        
            id: courses.length + 1,
            name: req.body.name
        
        }
        
        courses.push(course);
        res.send(course);    
        })
    
    
    router.put('/:id',(req, res)=>{
    
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
    
    router.delete('/:id',(req , res)=>{
    
    const course = courses.find(c => c.id === parseInt(req.params.id))
    
    if(!course) return res.status(404).send('The course with the given ID was Not found !!')
    
    const index = courses.indexOf(course);
    
    courses.splice(index, 1); 
     
    res.send(course); 
    
    })

    

module.exports = router;

    