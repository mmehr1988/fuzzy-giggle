// Create express server
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const path = require('path');

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

// Cors is a middleware that allows us to access our server from any other domain (client side)
app.use(cors());

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

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a LISTEN
app.listen(
  port,
  console.log(
    `Server running on port ${port} | http://localhost:${port}/graphql`
  )
);
