function log(req, res, next){

    console.log('Logging.....')
    next();
    
    }
    
function auth(req, res, next){
    
        console.log('Authentication.....')
        next();
        
        }
    

module.exports = log;         