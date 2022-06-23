// In this lecture we'll understand to structure the code in diffrent applications rather
// than writing the whole code in a single file.  

const Joi =  require('joi');
const helmet = require('helmet') 
const morgan = require('morgan')
const express = require('express');
const courses = require('./routes/courses')
const home = require('./routes/home')
const logger = require('./middlewares/Custom_middleware_function2')
const app = express();

app.use(helmet())

// first argument is the path and the second argument is router which we imported called courses  
app.use('/api/courses', courses)


// 

app.use('/', home);


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



app.get('/', (req, res)=>{

res.send("Hello from Server!!!" )

})


    const port = process.env.PORT || 5000 

    app.listen(port, ()=>{console.log(`Listening on ${port}`)});    
    
