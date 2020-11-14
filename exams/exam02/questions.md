# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
The path of the url should identify a thing (which you want to interact with), not an action.
For example, /addStudent/ is an example where the path does not identify a resource, but identifies an action (add a student record). We can change it to be /student and the action of adding will be done through making a post request with params: e.g. POST /student?name=alice

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
Fetch is an asynchronous call. Its immediate return value will be a promise instead of the actual value from the server. So the above will print out a promise. It can be changed to the following:
```
  fetch('/username')
  .then((username) => {
      console.log(`user is named ${username}`);
  })
```  

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
State refers to the current values for all things in the application that can change. 'store your state in the DOM' refers storing those values into the html, for example, read the login/logout button in an html to figure out if the user is logged in or not.
This adds complexity to the program. The screen is the visual output, and as it gets more complicated, so does the state interactions.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
Single-page-web application dynamically changes its content with new data from backend server. It does not reload the page during its usage.
Multiple-page-web application will need the browser to reload new pages.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
Progressive Enhancement refers to taking a web app that does not use client side javascript and augment it with javascript. With progressive enhancement, the app will continue to work even if there is no client side javascript.
An SPA without progressive enhancement will not be able to dynamically change the content of the page.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
Similarity: The response of REST service is generated on the fly by the backend server, which is similar to how dynamic asset is generated.
Difference: Dynamic asset is intened for HTML used by the browser. Rest service can return all sorts of formats HTML,text, JSON, etc.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
Large piece of data can not be stored in cookies as cookie can only hold short bits.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
This is a good example of separation of concern philosophy. Data fetching will be separated from the actual logic of handling the data (e.g. changing the html based on the data). The data fetching service can be reused for different purposes as it is no longer tied to a specific use case of the data.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
Asynchronous actions will be sent to event queue and run at a later time. Try/catch is synchronous, so the time when the asynchronous error is thrown, try/catch has already finished running.
in the following example, the then clause is ran by the event queue at a later time, and by then, the try/catch has already finished.
```
try {
  Promise.resolve()
    .then( () => {
      throw new Error("poop");
    });
} catch(err) {
  console.log(`caught ${err}`);
}
```

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
It is a concern for both.
Front end side example: separation of fetching data from backend with logic of handling the data(e.g. change the html with the data).
Server-side example: HTTP request handling and data manipulation. For data manipulation, an example would be read/update/delete data from a database.
