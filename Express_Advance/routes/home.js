const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{

    // res.send("Hello from Server!!!" )
    
    res.render('index',{title:'My Express App', message:'Hello from PUG!!!!'})
    
    })

module.exports = router;    