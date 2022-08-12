// ======================================
// SAMPLE DATA
// ======================================
// Brining in the sample Data & desctructuring
const { projects, clients } = require('../sampleData.js');

// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');

// ======================================
// GRAPHQL
// ======================================
// What we want to use from Graphql
// [1] GraphQLObjectType: When we have different resources like "projects, clients, users, blog posts",
//     you want to create a type for all of those

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// ======================================
// TYPES & QUERIES
// ======================================
// [1] TYPE | CLIENT: First setup the information that will compose a client
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // IMPORTANT: To add relationships between the two types
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// [2] ROOT QUERY OBJECT | CLIENT: The root query object will allow us to pull data for a client based on the fields we setup above.
// Example: query a client based on their "id"
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // ======================================
    // QUERY: ALL PROJECTS
    // ======================================
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // The find method will return an array of all the projects in the projects array
        return Project.find();
      },
    },
    // ======================================
    // QUERY: 1 PROJECT
    // ======================================
    project: {
      type: ProjectType,
      //   What information is required to pull information for the specific client
      args: { id: { type: GraphQLID } },
      // Our data being returned in something that is called a resolver.
      resolve(parent, args) {
        // The findById method will return a single project based on the id that is passed in
        return Project.findById(args.id);
      },
    },
    // ======================================
    // QUERY: ALL CLIENTS
    // ======================================
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // The find method will return an array of all the clients in the clients array
        return Client.find();
      },
    },

    // ======================================
    // QUERY: 1 CLIENT
    // ======================================
    client: {
      type: ClientType,
      //   What information is required to pull information for the specific client
      args: { id: { type: GraphQLID } },
      // Our data being returned in something that is called a resolver.
      resolve(parent, args) {
        // The findById method will return a single client based on the id that is passed in
        return Client.findById(args.id);
      },
    },
  },
});

// [3] USE Query
// [A] - Create SCHEMA
//       SCHEMA: The schema is the top level query object that will allow us to query for data.

// [B] - Export SCHEMA
module.exports = new GraphQLSchema({
  query: RootQuery,
});
