# Rules for classwork

The items below apply to all your assignments/exams/projects.

Each specific assignment will have additional rules, see the instructions for those assignments.  Common sense rules are not listed in either place, this is a guide, not the minimum.

This list will grow as we add items from class.

Items that are marked with `(For this class)` mean that they aren't global best practices, but are still required for this class (and may be general good practices, but not as firm as "best")

## HTML
- Use "semantic" HTML when possible
- Do not create invalid HTML and count on the browser to fix it
- Always use HTML5 (`<!doctype html>`)
- Always use lowercase tag names
- Do not use CSS inside `<style>` tags 
- Do not use inline CSS in your HTML
- Do not use JS inside `<script>` tags
- Do not use inline JS in your HTML
- Always use kebab-case for HTML classes, not MixedCase or CamelCase (For this class)
- Minimize the use of id attributes, keeping them to one or two higher-level elements (use classes instead) (For this class)

## CSS
- Do not use `!important`
- Use class names that describe the content instead of how the content will appear
- Avoid using prefixed properties (e.g. --moz-something)
- Do not use `float` unless you are wrapping text around an image
- Do not use `table-` properties (For this class) 
- Do not set everything to a fixed width - allow for the page to resize automatically

## JS
- Do not use `alert()` 
- Always `"use strict";` at the start of your JS file for browsers
- Always use strict comparison (===) unless using truthy/falsy
- Never use `var`
- Do not use `instanceof` or `typeof`
- Always use syntax constructors over class constructors
  - E.g. use `{}` or `[]` instead of `new Object()` or `new Array()`
- Always use {} in an `if` statement, even if it is one-line
- Prefer to use `let` over `const` (For this class)
- Always use semicolons where appropriate (For this class)
- Do not use Map() or Set() (For this class, purely to learn JS objects)

## JSX
- Always capitalize filenames and module names
- One component per file (For this class)
- Name your component to match your filename
- Have meaningful component names
- Use .jsx extensions on components (For this class) 
- Break up your component if it gets complex
- Do not use props to set state
