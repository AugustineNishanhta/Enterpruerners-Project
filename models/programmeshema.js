// programme.js

const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  weekNo: { type: Number, required: true },
  study: { type: String, required: true },
  outcome: { type: String, required: true },
  pdfFile: { type: String, required: true },
});

const programmeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modules: [moduleSchema],
});

module.exports = mongoose.model('Programme', programmeSchema);
