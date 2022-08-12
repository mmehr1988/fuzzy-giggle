// Create express server
const express = require('express');
const colors = require('colors');

// ======================================
// PORT SETUP
// ======================================
// Require the dptenv extension
require('dotenv').config();

// Bring in graphql http from express-graphql package
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
// Create a port variable - it will first look in our environment variables for a port variables else the fallback is port 5000
const port = process.env.PORT || 5000;

// Create app variable to initialize express
const app = express();

// Connect to the database
connectDB();

// Create a USE
// https://graphql.org/graphql-js/running-an-express-graphql-server/
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // Graphql tool while in development mode only
    graphiql: process.env.NODE_ENV === 'development',
  })
);

// Create a LISTEN
app.listen(
  port,
  console.log(
    `Server running on port ${port} | http://localhost:${port}/graphql`
  )
);
