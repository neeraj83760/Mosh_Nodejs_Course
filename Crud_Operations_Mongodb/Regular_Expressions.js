const mongoose = require('mongoose')

// The below mentioned connect method returns a promise 
mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))


const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default:Date.now},
    isPublished: Boolean

})

 
const Course = mongoose.model('Course', courseSchema);


async function createCourse(){


    const course = new Course({

        name:'Angular Course',
        author:'Mosh',
        tags:['angular','frontend'],
        isPublished: true
    });
    

    const result = await course.save();
    // console.log(result); 

}


async function getCourses(){

const courses = await Course
// .find({author:'Mosh', isPublished: true})
// Starts with Mosh

// In regular expresssions ^Mosh this means the string starts with Mosh 
.find({author: /^Mosh/})

// Suppose we want the author ends with Hamedani... this pattern checking is case sensitive 
// so if u want to make it case Insensitive u just need to add 'i' at the end 
.find({author: /Hamedani$/i}) 

// Suppose we want the all the authors which contains the word 'mosh' it can be in the begnining
// or in the middle or at the end
.find({author: /.*Mosh.*/i})  
.limit(10)
.sort({name:1}) 
.select({name:1, tags:1})    

console.log(courses);

}

// createCourse();

getCourses();


// *********************************** Counting ***********************************************

async function getCourses(){

    const courses = await Course
    .find({author:'Mosh', isPublished: true})
    .limit(10)
    .sort({name:1}) 
    // Instead of using the below mentioned statement 
    // we can use the count method which can find " .find({author:'Mosh', isPublished: true})" in all
    // the documents 
    // .select({name:1, tags:1})    
    .count()  
    
    console.log(courses);
    
    }


// ********************************Pagination*********************************************

// the method go hand in hand with the 'limit' method is 'skip' method which we use
// for Pagination 

async function getCourses(){
    
    const pageNumber = 2;
    const pageSize = 10;
    
    // Suppose u have an api/courses?pageNumber=2&pageSize=10 
    const courses = await Course
    .find({author:'Mosh', isPublished: true})
    // For Implementing the Pagenation we need to skip all the documents in the previous page
    .skip(pageNumber -1 * pageSize) 
    .limit(pageSize)
    .sort({name:1}) 
    // Instead of using the below mentioned statement 
    // we can use the count method which can find " .find({author:'Mosh', isPublished: true})" in all
    // the documents 
    // .select({name:1, tags:1})    
    .count()  
    
    console.log(courses);
    
    }