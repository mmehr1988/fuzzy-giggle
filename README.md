# fuzz-giggle

## Project: Project Management App

<a href="https://choosealicense.com/licenses/mit" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>

## Table of Contents:

1. [Description](#description)
1. [Technologies](#technologies)
1. [Initial Steps](#initial-steps)
1. [License](#license)
1. [Questions](#questions)

## Description

A simple project management system that has full CRUD functionality. Users can add their projects, connect projects to clients, and a page which shows all the information including the client information as well as an area to update the details.

For the backend, the app uses GraphQL & Express along with MongoDB for database management. For the frontend, the app uses Apollo Client.

## Technologies

1. [Node.js](https://www.npmjs.com/package/inquirer) Packages

   a. Dependencies

   - [colors](https://www.npmjs.com/package/colors)
   - [cors](https://www.npmjs.com/package/cors)
   - [express](https://www.npmjs.com/package/express)
   - [express-graphql](https://www.npmjs.com/package/express-graphql)
   - [graphql](https://www.npmjs.com/package/graphql)
   - [mongoose](https://www.npmjs.com/package/mongoose)

   b. devDependencies

   - [dotenv](https://www.npmjs.com/package/dotenv)
   - [nodemon](https://www.npmjs.com/package/nodemon)

2. CSS Framework

   a. [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/)

## Initial Steps

### 1. Server Setup

- Create express server
  - Initialize express and setup port
  - Create dummy dataset to use
  - Setup graphql endpoints
  - Create schema for queries

### 2. Connect Database to MongoDB + Atlas

- Use Mongoose to connect to MongoDB
- Create database models

### 3. Create Front-End

- Use apollo client to query our graphql api
- Use bootstrap for the ui an styling

## License

<a href="https://choosealicense.com/licenses/mit" target="_blank">MIT License</a>

## Questions

Github Portfolio Link: [Mehdi Mehrabani](https://github.com/mmehr1988)<br>
