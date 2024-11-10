const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
  },
  cropType: { type: String, required: true },
  size: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Field', FieldSchema);
