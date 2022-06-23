const { equal } = require('joi/lib/types/object');
const mongoose = require('mongoose')

// The below mentioned connect method returns a promise 
mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))

// After connection we need to create an Schema 
// to define the documents with the collection in Mongodb
// courseSchema defines the shape of the course document in our Mongo DB database


const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default:Date.now},
    isPublished: Boolean

})

// Just we have classes and objects 
// Suppose we have calss Course then we should be able to create instances of that class 
// like : nodeCourse and then we save that nodeCourse to our Database 
// So to create a class like Course we need to compile 'courseSchema' into a model 

// first agrgument for the model function is singular name of the collection this model is
// for ... second argument is the schema that defines the shape of the document in this 
// collection

// with this we called the course class 
const Course = mongoose.model('Course', courseSchema);

// Now we will create an object based on this class 

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

// ********************Saving Document ************************************

// this course object has a method called save . Here we are dealing with async operation
// because it;s going to take sometime to save this course in the database because
// we are going to access the filesystem that's why we are dealing with async operations
// the result of the operation will be ready in future so the below mentioned method
// returns the 'PROMISE' 

// const result = await course.save();

// Once we save the data into the database the mongdb assign aunique Identifier to this
// course object to this course document we will just log in on the console

// console.log(result); 

// **************************Querying Documents **************************************

// The Course class we have declared earlier have many methods for quering the documents


async function getCourses(){

// This find method returns the document query object...that document query object is kind of
// like a promise it has a then method 

const courses = await Course
.find({author:'Mosh', isPublished: true})
// .find({price:{$gte:10, $lte:20}}) // this expression means find the documents whose prices are greater then 10 and less than 20
// .find({price:{$in: [10,15,20] }}) // find the documents have the price attributes 10,15,20
// .find()
// .or([{author:'Mosh'},{isPublished:true}])
// .and([])  // the 84,85,86 lines of code tells u about the logical or operators  
.limit(10)
.sort({name:1}) // 1 indicates asending order sorting of the documents and -1 is for desending 
.select({name:1, tags:1})     // to select the specific property which we want to return 

console.log(courses);

}

// createCourse();

getCourses();


// ************************Comparision Query Operator *******************************

//  From here onwards we will learn how to build more complex query to filter the documents
//  In mongodb we have many operators for the comparision purpose 

/* eq sort for (equal)
   ne          (not equal)  
   gt          (greater than)
   gte         (greater than equal)
   lt          (less than) 
   lte         (less than or equal to)
   in          ()
   nin        not in 


*/

// *************************Logical Query Operators **************************************

// We have 'or' and 'and' operators