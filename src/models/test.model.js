const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const testSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: [{
        type: String,
        enum: ['A', 'B', 'C', 'D']
      }],
      required: true
    },
    duration: {
      type: number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
testSchema.plugin(toJSON);
testSchema.plugin(paginate);

/**
 * @typedef Test
 */
const Test = mongoose.model('Test', testSchema);

module.exports = Test;
