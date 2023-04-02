const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

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
      type: Number,
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
 * Check if name is taken
 * @param {string} name - The test's name
 * @param {ObjectId} [excludeTestId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
testSchema.statics.isNameTaken = async function (name, excludeTestId) {
  const test = await this.findOne({ name, _id: { $ne: excludeTestId } });
  return !!test;
};

/**
 * @typedef Test
 */
const Test = mongoose.model('Test', testSchema);

module.exports = Test;
