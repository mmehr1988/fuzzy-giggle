# fuzz-giggle

## Project: Project Management App

[![image](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit)

## Table of Contents

1. [Description](#description)
1. [Technologies](#technologies)
1. [Initial Steps](#initial-steps)
1. [Learnings](#learnings)
1. [License](#license)
1. [Questions](#questions)

## Description

A simple project management system that has full CRUD functionality. Users can add their projects, connect projects to clients, and a page which shows all the information including the client information as well as an area to update the details.

For the backend, this app uses [GraphQL](https://www.npmjs.com/package/graphql) & [Express](https://www.npmjs.com/package/express) along with [MongoDB](https://www.mongodb.com/atlas/database) for database management.

For the frontend, this app uses [Apollo Client](https://www.apollographql.com/docs/react/) to interact with the backend and [React Bootstrap](https://react-bootstrap.netlify.app/) for the UI/UX.

## Technologies

1. [Node.js](https://www.npmjs.com/package/inquirer) Packages

   a. Dependencies

   - [colors](https://www.npmjs.com/package/colors)
   - [cors](https://www.npmjs.com/package/cors)
   - [express](https://www.npmjs.com/package/express)
   - [express-graphql](https://www.npmjs.com/package/express-graphql)
   - [formik](https://www.npmjs.com/package/formik)
   - [graphql](https://www.npmjs.com/package/graphql)
   - [mongoose](https://www.npmjs.com/package/mongoose)
   - [yup](https://www.npmjs.com/package/yup)

   b. devDependencies

   - [dotenv](https://www.npmjs.com/package/dotenv)
   - [nodemon](https://www.npmjs.com/package/nodemon)

2. CSS Framework

   a. [React Bootstrap](https://react-bootstrap.netlify.app/)

## Initial Steps

### 1. Server Setup

- Create [express](https://www.npmjs.com/package/express) server
  - Initialize [express](https://www.npmjs.com/package/express) and setup port
  - Create dummy dataset to use
  - Setup [graphql](https://www.npmjs.com/package/graphql) endpoints
  - Create schema for queries

### 2. Connect Database to MongoDB + Atlas

- Use [mongoose](https://www.npmjs.com/package/mongoose) to connect to [mongodb](https://www.mongodb.com/atlas/database)
- Create database models

### 3. Create Front-End

- Use [apollo client](https://www.apollographql.com/docs/react/) to query our api
- Use [react bootstrap](https://react-bootstrap.netlify.app/) for the UI/UX.
- Use [formik](https://www.npmjs.com/package/formik) + [yup](https://www.npmjs.com/package/yup) for form creation and validation.

## Learnings

### 1. Dotenv Issues When Deploying To Heroku

- Issue: While trying to deploy to Heroku, the issue that continued to arise was errors around connecting to the database.
- Solution: Since this app uses environment variables to connect to mongodb, using the dotenv package made this process seemless. However, the dotenv package was installed as a devDependencies, and Heroku was not installing it as a package. This resulted in errors when deploying to Heroku. The fix was to simply install the package as a dependency.

## License

[MIT License](https://choosealicense.com/licenses/mit)

## Questions

Github Portfolio Link: [Mehdi Mehrabani](https://github.com/mmehr1988)<br>
