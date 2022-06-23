
// console.log() // this is a global object kyonki isse hum kahin se
// bhi kisi bhi file me access kar sakte hai 

// setTimeout // ye function bhi global object hai 

// window// ye global object hota hai browsers me and node me global global object hota hai 


// console.log settimeout function belong karte hai window object ko tabbhi unhe hum
// window.console.log se access karte hai ...... waise agar hum window na bhi lagaye
// to wo automatcally browser window add kar deta hai 

// VVVIM point :  var message = 'neeraj' console.log(message) variables add nahi hote
// global object me in nodejs wo jis file me declare hote hai wahi tak seemit rehte
// usi file ke scope tak........... hai example given below

// var message = 'neeraj'

// console.log(message);

// console.log(global.message);




