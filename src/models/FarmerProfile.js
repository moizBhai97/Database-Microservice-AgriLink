const mongoose = require('mongoose');

const FarmLocationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
});

const FarmDetailsSchema = new mongoose.Schema({
    farmLocation: { type: FarmLocationSchema, required: true },
    farmSize: { type: Number, required: true, min: 0 },
    cropsGrown: { type: [String], required: true },
    licenseCertifications: [String],
});

const CreditScoreSchema = new mongoose.Schema({
    score: { type: Number, min: 300, max: 850 },
    lastUpdated: { type: Date, default: Date.now },
});

const BankDetailsSchema = new mongoose.Schema({
    accountNumber: { type: String },
    bankName: { type: String },
    accountHolder: { type: String },
});

const ContributionStatsSchema = new mongoose.Schema({
    numContributed: { type: Number, default: 0 },
    numLabeled: { type: Number, default: 0 },
    numValidated: { type: Number, default: 0 },
});

const FarmerProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    farmDetails: { type: FarmDetailsSchema, required: true },
    creditScore: CreditScoreSchema,
    bankDetails: BankDetailsSchema,
    contributionStats: ContributionStatsSchema,
}, { timestamps: true });

module.exports = mongoose.model('FarmerProfile', FarmerProfileSchema);