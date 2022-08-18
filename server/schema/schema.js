// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');

// ======================================
// [1] GRAPHQL
// ======================================
// Bring in graphql
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// ======================================
// [1] TYPES & QUERIES
// ======================================
// [A] TYPE | CLIENT: First setup the information that will compose a client
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
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

// [B] ROOT QUERY OBJECT | CLIENT: The root query object will allow us to pull data for a client based on the fields we setup above.
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

// ======================================
// [3] MUTATIONS
// ======================================

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a new client
    addClient: {
      type: ClientType,
      args: {
        // GraphQLNonNull is used to make sure that the client name is required
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // Creating a new client using the mongoose model
        // We are passing in the key values that come from our graphql query
        const client = new Client({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
        });
        // Save the return data to the database
        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Find the client projects and delete
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });
        // Find the client by the id and then delete it
        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          // GraphQLEnumType is used to make sure that the status is either "Not Started" or "In Progress" or "Completed" with a default value of "Not Started"
          type: new GraphQLEnumType({
            // name must be UNIQUE
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Creating a new project using the mongoose model
        // We are passing in the key values that come from our graphql query
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        // Save the return data to the database
        return project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Find the project by the id and then delete it
        return Project.findByIdAndDelete(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          // GraphQLEnumType is used to make sure that the status is either "Not Started" or "In Progress" or "Completed" with a default value of "Not Started"
          type: new GraphQLEnumType({
            // name must be UNIQUE
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
        clientId: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Find the project by the id and then update it
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

// ======================================
// [4] EXPORT SCHEMA
// ======================================
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
