const path = require('path')

var pathObj = path.parse(__filename)

console.log(pathObj)

//  Output of the above code is :  
/*
{
    root: '/',
    dir: '/home/neeraj/MoshNodejs/Node_Module_system',
    base: 'Path_module.js',
    ext: '.js',
    name: 'Path_module'
  }

*/