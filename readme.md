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
