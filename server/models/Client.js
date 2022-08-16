const mongoose = require('mongoose');

// ======================================
// Create Mongoose Schema
// ======================================
// mongoose schema is not related to the graphql schema

// ----------------------------------------------------------------------------
// Layer 3 | GraphQL API - on top of the mongoose layer is where the graphql layer lives
// Layer 2 | Mongoose Layer - The object datamapper layer where we create a schema that includes the fields for our database collections
// Layer 1 | MongoDB Database
// ----------------------------------------------------------------------------

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
