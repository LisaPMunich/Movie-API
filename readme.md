# Movie-API

This API allows a user to receive information on movies, directors, and genres so that he can learn more about movies he has watched or is interested in. Also he can create a profile, so he can save data about his favorite movies.

## The Development process

### Creating HTTP requests and testing the endpoints

**Postman: Testing of endpoints**

<img src="https://user-images.githubusercontent.com/99111208/161479118-6014200c-aa61-4424-ba93-948936617e51.png" alt="Postman Testing">

### Documentation

**Swagger: Writing documentation of endpoints**

<img src="https://user-images.githubusercontent.com/99111208/161479123-1471ab5a-6256-4c1b-99df-41e9ce3c004c.png" alt="swagger documentation">

### Non-relational database MongoDB: Building the database

* use Mongo Shell to create database with CRUD operations
* Create the 2 collections "movies" and "users".
* Add 10 documents to the "movies" collection (including embedded documents for the keys "genre" and "director").
* In the "users" collection - consisting of 4 documents - references are used to store information about the user's favorite movies.

### Building models with Mongoose (Business Logic)

* Defining the Schema
* Creation of the Models
* Exporting the Models
* Integrating Mongoose with the REST API
* Rewriting the CRUD operations, fill in each request method with the Mongoose logic to make the request methods functional
* test the endpoints in Postman

<img src="https://user-images.githubusercontent.com/99111208/162483313-eeab363f-be89-4493-a05f-f1abfe9896f3.png" alt="Postman documentation">

* rewrite the Swagger documentation

<img src="https://user-images.githubusercontent.com/99111208/162483329-578dba1f-2b50-4cd3-9f52-7b9849a6917d.png" alt="Swagger documentation overview">

<img src="https://user-images.githubusercontent.com/99111208/162483322-147bb2e2-1e4d-4554-b909-d1987091a02a.png" alt="Swagger documentation detail1">

<img src="https://user-images.githubusercontent.com/99111208/162483324-7accde1e-e3a1-43c1-9212-56eb33dd10ce.png" alt="Swagger documentation detail2">

* REST API and MongoDB database successfully connected!

<img src="https://user-images.githubusercontent.com/99111208/162485245-b15d95e7-3edc-419c-b72b-1e76dff4b165.png" alt="browser view">

## Data Security

### Authentication in Node.js/Express using Passport

* Implement basic HTTP authentication for initial login requests
* implement login query with generation of JWT token, see screenshot below demonstration working endpoint in Postman:

<img src="https://user-images.githubusercontent.com/99111208/162905239-a86a61ae-ff22-4410-8c8e-4a397dbf5436.png" alt="Screenshot Postman with POST endpoint for login">

* Update Swagger documentation

<img src="https://user-images.githubusercontent.com/99111208/162905204-e4b60cd9-b123-4f71-9ce1-197a0d6c074e.png" alt="Screenshot Swagger documentation updated">

### Implementation of Security Measures for Backend

* CORS in Express (set to allow for all origins)
* Bcrypt for Password hashing (see screenshot)

<img src="https://user-images.githubusercontent.com/99111208/163310983-1f30f9be-dd62-4c70-afef-72acfcec781b.png" alt="Screenshot successful password hashing">

* Express-Validator for server-side data input validation

<img src="https://user-images.githubusercontent.com/99111208/163312208-f2e15c6e-30d6-4ae8-b61f-b1221d045922.png" alt="Screenshot test of successful data validation in endpoint POST '/users/{Name}/movies/{Title}">

* Adjust Environment variable to not reveal Connection URI

<img src="https://user-images.githubusercontent.com/99111208/163313326-2c05fa2f-185f-4da8-91e5-04b3bbc79629.png" alt="Screenshot adjusting environment variable on HEROKU">

<img src="https://user-images.githubusercontent.com/99111208/163313342-ecbf4ff4-de6e-47c9-85e3-755742e8c9c7.png" alt="Screenshot adjusting environment variable in code">

### Upload Local Database to MongoDB Atlas -via mongo import


## Process of Hosting on HEROKU (PaaS)

### First Steps

* register with heroku, install toolbelt
* change port
* create Heroku app
* push Git main to Heroku

### Troubleshooting of deployment process

  * H10 Syntax Error Object Compilation --> Solutions: 
  * add version of node.js (16.14.2) to package.json,
  * change HEROKU version from 20 to 18
  * remove programming/ code errors:
    * remove single quotes from mongoose connection string process.env.CONNECTION_URI, 
    * remove scratch shell command from IDE (still left from deployment)
    * fix parameters of custom error handler (have to be 4, not 3)
    
## Deployment to HEROKU - FINALLY

<img src="https://user-images.githubusercontent.com/99111208/163316015-6b1cf16d-9469-4f92-85ee-0957de9e3ab2.png" alt="Screenshot app finally online on Heroku">


