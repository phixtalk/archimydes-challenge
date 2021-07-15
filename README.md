## Archimydes Challenge React-Redux TypeScript & Node.js Application

This project is a simple frontend react-redux and backend node.js api server application.
Below are steps required to reproduce and run the applications.

---

## NodeJS

- #### Version

      $ node --version
      10.15.3

      $ npm --version
      6.4.1

- #### Steps to run nodejs server api

- git clone https://github.com/phixtalk/archimydes-challenge
- cd node-backend
- npm install
- npm run dev

if server successfully starts, you should see the output below in your terminal

    connected to db

- #### Environment variables

  A .env file in included in the project. It contains information information for, the MongoDB server and node
  port required by the application

- #### Architecture Pattern

  MVVM / Repository pattern was used in the architecture of the nodejs application. This pattern emphasizes seperation of concerns and single responsibility design pattern. For example, the controllers delegates tasks to the services, and the services accesses data via the data-access layer. So incase we wish to substitute one data storage for another, it's only a matter of swapping out the data access functions with the a new one that returns data in the same format.

- #### Testing API in Postman

      For POST or PUT requests, you can input data in any of these sections in the body tab
        - raw
        - x-www-form-urlencoded

- #### Unit Testing

      The following test libraries was used for writing the test cases:
        - chai
        - chai-http
        - mocha

- #### Unit Test Recommendations

  Although in this test project, the production database was used in testing, this is not right approach.
  it is recommended to have a testing database different from the actual db, or to use libraries like mockgoose that simulates a test database and resets after every test.

- #### Bugs Encoutered

  A major error encountered was in unit testing the apis. For some reason the default express **app** configurations in the app.js fill when passed in as a paramter to the chai.request object had the un-usual result of dynamically assigning random port numbers to be used in making the api requests. This lead to errors as the application was not receiving any requests from the test cases.
  After several hours of debugging, the actual url and port was passed into the chai.request object, and the error stopped.
  Another error faced was the unit test timing out after 2000ms, due to fluctuating internet speeds.
  This was resolved by increasing the time limit to 10000ms in the test-value of the scripts section in package.json file

- #### OpenAPI / Swagger Documentation

The Swagger library was used to document api routes, requests and responses. See link below:
**Swagger Url:** `http://localhost:3001/api-docs`

---

## ReactJS

- #### Version

      $ react --version
      17.0.2

      $ redux --version
      4.0.5

      $ typescript --version
      4.1.2

- #### Steps to run reactjs frontend application

- git clone https://github.com/phixtalk/archimydes-challenge
- cd react-frontend
- npm install
- npm run start

if application starts successfully, default browser will be lauched and a list of users will be displayed in a table

- #### Architecture Pattern

  Redux/Flux architecture pattern was used in the reactjs application.
  This pattern emphasizes seperation of concerns and single state management approach. Here we have a single source of truth and data flows in a uni-directional path.

- #### Bugs Encoutered

  One of the errors encountered was the:
  ...has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
  by the firefox and chrome browsers.
  A quick fix for this was to install and use the **cors** library in the **app** component
