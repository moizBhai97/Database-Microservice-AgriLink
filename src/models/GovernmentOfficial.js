const mongoose = require('mongoose');

const GovernmentOfficialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    department: { type: String },
});

module.exports = mongoose.model('GovernmentOfficial', GovernmentOfficialSchema);
