# Random Class Notes


## lifecycle

Class-based components:
- mounted (leads initial render)
- rendered
- unmounted

Function-based components:
- mounted (leads initial render)
- rendered
  - triggered by state changes or prop changes
  - checks to run useEffect
  - runs useState
- unmounted
  - runs any clean up function returned by useEffect

## hooks and variables

### Do I use a hook?
- Is this a value that persists between renders and triggers a render when changed? (yes, useState)
- Is this a value that is calculated during render and is based on other values only?  (no, use a normal variable)
- Is this a callback? (then it is a prop)
- Is this data I was passed?  (then it is a prop)
- Is this called based on rendering?  (yes, useEffect)

### When can hooks be confusing?

- Async
- setting state is async
  - don't try to read the state you just changed
  - don't assume the timing of multiple state changes
- useEffect is sync
  - so any async effects in the callback may not be complete

### useEffect and params

`useEffect( callback )`;   // Called every render - shouldn't change the state of this component
`useEffect( callback, []);`  // Called only on first render - per instance mounted
`useEffect( callback, [dependencyValue1, dependencyValue2]);` // Called if either value is different than last render

When does a component rerender?
- when a prop or state changes
  - What counts as a "change?"
    - remember that `{ one: 'a'} !== { one: 'a' }` and ` () => console.log('hello') !== () => console.log('hello')`
    - useMemo to store calculated values, and useCallback to store functions
      - Do not start there

## polling in react

- something starts the polling (I recommend useEffect())
- need to save the timeout/interval id so you can STOP the polling
- to do this, useEffect returns the function that will stop the polling (React will call that function when the component is unmounted)
  - see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1

## frontend, backend, and full-stack

- backend dev
  - mostly not concerned with frontend, instead with contract
  - Do need to consider CORS, do need to consider auth (remember, stateless!)
- frontend dev
  - rarely have influence over backend
  - will have to understand backend devs don't care about browsers
  - front end tends to change more quickly
  - front end does tend to have to worry about browser (including IE or other "deadbeat" browsers)
- full stack dev
  - best of both worlds, can cooperate
  - no time to be a specialist
  - small teams or no teams





