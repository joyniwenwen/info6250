# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
Static assets are something we send to the user that the server doesn't change, like images, javascript, css. Dynamic assets are something that changes changes on a web resource which is mainly data that keeps changing on a page which is specific to a user or items.
## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
A relative path only includes the part of the path, like the name of a specific file or page which is relative to the current path. An absoulte path includes a complete path, which includes a protocol, the website's domain name and possibly a specific file, subfolder, or page name. The webserver root/document root is the folder that is accessed when users type the domain name of a website into the search bar of their browser. Like the localhost/3000 we used in the class. The webserver root/document root is the root directory of absolute file path.
## Q: What is the difference between server-side and client-side JS?
Client-side JavaScript code is run on the client machine, which is the browser. Server-side JavaScript code is run on the server which is serving web pages. And the server-side JavaScript,also known as Node JS, have a lot of different features than the client-side JavaScript. 
## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
var variables can be updated and re-declared, and their visiblity is limited to the function; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared. let and const variables' visibility is limited to the block of code.  But while var variables are initialized with undefined , let and const variables are not initialized. We should avoid using var and if we need to create a variable, use const. However, if we know or think that we'll need to reassign it, use let.
## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
1.Object as literal, all the objects created with literal notation inherit properties from Object.prototype
1.Constructor Function: We can use new keyword on a function call, so that the prototype property is assigned as the prototype of the new object.
2.Object.create(): This method gives a new object, with the new object's prototype set to the passed in object.
3.ES6 classes: With the ES6, We can create classes and derive new classes from other classes.
4.Brute Force: Set the prototype directly by Object.setPrototypeOf(new_object, old_object).
## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
function purr(){}
let myPurr = new purr();
## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
let snake = {
    hiss: function(){}
}

let cobra = Object.create(snake);
cobra.hiss();
## Q: Explain what a callback is, and give an example.
A callback function is a function that is passed as an argument to another function.
Example:
const print = function(callback) {
    callback();
}

const say = function (){
    console.log("hello");
}

print(say);
## Q: What are the words that would correctly fill in the space in this sentence:
a callback
"If a function using `this` is `_______`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
It makes the reader confused, hard to read and not good for re-use or further development. 
Example:
bad: .button{} good: .button-submit{}
