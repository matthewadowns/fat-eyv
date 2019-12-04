const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const ProjectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

ProjectSchema.plugin(findOrCreate);

module.exports = ProjectSchema;
