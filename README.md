# HTTP Authentication

### In this benchmark goal you're going to build an Express HTTP server that allows users to signup, login and logout of your application.

### Your HTTP routes will be able to render different information depending on whether the request is from an unknown visitor or a logged in user.

### There are a ton of specs you need to build so make sure you break each problem down into smaller steps you can take sequentially.

## Skills

* Can build a HTTP server with Node and Express
* Can make HTTP POST requests to a server with a form
* Can store data in an HTTP cookie using Node and Express
* Can implement a SQL schema by looking at the specs
* Can use pg-promise to communicate to a postgresql server
* Specs

-[ ]build this app in a new empty GitHub repository
-[ ]use node
-[ ]ensure all your npm dependencies are listed in your package.json
-[ ]use postgresql
-[ ]design a database schema to store users
-[ ]commit your schema in schema.sql
-[ ]use the body-parser node package
-[ ]use the cookie-session node package
-[ ]use the pg-promise node package
-[ ]implement the following user stories:
-[ ]and you visit / (the home page) you see:
-[ ] "Hello Stranger"
-[ ] a link to /signup
-[ ] a link to /login
-[ ] and you visit /signup
-[ ] a form with:
-[ ] email
-[ ] password
-[ ] password confirmation
-[ ] and you submit the signup form
-[ ] with no values
-[ ] you should see the signup page again but with the error "please provide an email and a password to sign up"
with a value in the password field that does not match the value in the password confirmation field
-[ ] you should see the signup page again but with the error "passwords do not match"
-[ ] with a valid email, and matching passwords
-[ ] a new user should be inserted into the database
-[ ] your session cookie should be updated with the new user id
-[ ] you should be logged in and redirected to the homepage
-[ ] a form with:
-[ ] email
-[ ] password
-[ ] and you submit the login form
with no values
you should see the login page again with the error "please provide an email and a password to login"
-[ ] with a correct email but an incorrect password
-[ ] you should see the login page again with the error "incorrect email or password"
-[ ] with an incorrect email and any password
-[ ] you should see the login page again with the error "incorrect email or password"
-[ ] with a matching email and password
-[ ] you should be logged in and redirect to the home page
-[ ] when you are logged in
-[ ] and you visit / (the home page) you see:
-[ ] "Welcome back [email address]"
-[ ] a link to /logout
-[ ] and you visit /login
-[ ] you are redirected to the homepage
-[ ] and you visit /signup
-[ ] you are redirected to the homepage
-[ ] are logged out and then redirected to the home page

## Stretch

-[ ] write tests for your express routes using chai-http
-[ ] encrypt passwords using bcrypt
-[ ] Testing
