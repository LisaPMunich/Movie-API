# Movie-API

This API allows a user to receive information on movies, directors, and genres so that he can learn more about movies he has watched or is interested in. &lt;br> Also he can create a profile, so he can save data about his favorite movies.

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