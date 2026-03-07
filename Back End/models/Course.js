const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);