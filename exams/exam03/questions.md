# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)
1. Components should be reusable so that you would get advantage from them being called repeatedly. Components should not know what's outside themselves.  Similarly, if you never wrote any function that was used more than once, then the functions are only used for breaking up code, but not making the code easier.
2. We should not put too much in one component (e.g. having too many HTML elements inside the component). Instead, we should break it down to multiple components and they can call others. This is similar to the best practice for functions where one function should not being doing too much (one function, one purpose).

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
1. The application will remain working if no JS.
2. Great for accessibility and various devices.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.
Steps involved:
1. Browser is sending a request to `/service`, which default to the current server, which means `http://localhost:3000/service`.
2. Since `http://localhost:3000` does not have `/service`, dev server will make the request to the proxy server `http://localhost:4000/service`.
3. Dev server then sends the response back to browser.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
After running `npm run build`
1. Browser is sending a request to `/service`, hich default to the current server, which means `http://localhost:4000/service`.
2. It happens that the backend server is also served on the same host, so browser will get the response from the server.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
It means passing data from parent component to child component, instead of child to parent.
```jsx
const ParentComponent = () {
    return (
        <div className="app">
        <ChildComponent name='alice'/>
        </div>
    );
}

const ChildComponent = ({props}) {
   return <h1>Hello, {props.name}</h1>;
}
```

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.
Basically you can pass a handler (which does data modification) to child component.
In the following example, by passing a handler `login` from parent component to child component, child is able to change the parent's state without reading/seeing it.

```jsx
const [userState, setUserState] = useState({ isLoggedIn: false });
const login = function({username, info}) {
    setUserState({
      isLoggedIn: true,
    });
};
const ParentComponent = () {
    return (
        <div className="app">
        <ChildComponent onLogin={login}/>
        </div>
    );
}

const ChildComponent = (login) {
    login();
}
```
## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

I choose to use object for the student collection because
1. Students does not need to be ordered. Items in an object is unordered.
2. It is easy to look up student by their id. This is done via accessing object value by key (student id in this case).

```javascript
const students = {
    '654321': {
        id: "654321",
        name: "Bao",
        address: "123 Main Street",
    },
    '12345': {
        id: "12345",
        name: "Alice",
        address: "100 Main Street",
    },
}
```

I choose to use array for the pizza steps collection because
1. Array is ordered, so does pizza steps.
```javascript
const pizzaSteps = [
    {
        qty: "2 cups",
        ingredient: "flour", 
        instructions: "mix the flour",
    },
    {
        qty: "1 cup",
        ingredient: "shredded cheese", 
        instructions: "sprinkle over pizza",
    },
]
```

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
Inheritance in JS refers to one object being able to use properties/methods of another object. Prototype itself is an object. When we try to access a value on the object, and the object doesn't have it defined for itself, it will check to see if its prototype has it. This kind of behavior is inheritance.

```javascript
const name = "amit";
console.log(name.toUpperCase());
```

In this same toUpperCase method is inherited from name's prototype, i.e. String.prototype.toUpperCase().

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.
The second condition is not necessary. The second condition basically checks for whether username is null or undefined. Those two conditions are included in the first check.

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
Decoupling is trying to make components in the application having less awareness of each other so that changing in one component might not need to touch others. The functionality of each component is self-contained. MVC (model-view-controller) is an example where presentation logic(View) and business logic (Model) is decoupled and only communicate via controller.

In terms of React app, JSX will be responsible for presentation logic (e.g. whether something should be shown or not), which is decoupled from data logic/model logic. This is beneficial so that HTML handling is separate from core data/model logic.
