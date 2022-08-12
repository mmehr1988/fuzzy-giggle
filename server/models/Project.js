const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    // Specifying the values that can be assigned to the status field
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  // For Relationships
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    // The ref property is used to link the clientId field to the client model
    ref: 'Client',
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
