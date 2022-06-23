
// jab bhi hum variable or function declare karte hai browsers me wo add ho jaata hai
// global object ke saath which we called a window object ...exyamples given 
// below 

var sayHello = function(){

    console.log("This is say hello function !!!")
}

// the above function is available via window object .... we can access it by writing window.sayHello()

// In real world application we can split our code in multiple files ...so aisa ho sakta hai
// hum dono files me same function ko do diffrent defintion de .. but isse function override 
// ho jaayega .. islye hum avoid karte hai function and vaiables ko declare karna global scope me 
// Instead humein modularity chahiye 

// But Node me har file ko module kehte hai kyonki uske variables window object ke saath 
// nahi lagte ... Object oreiented programming me hum usse 


// console.log(module)   even module khud ek object hota hai jisme exports ek empty 
// object hota hai 






