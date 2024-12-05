const stripe = require('./utils/stripe');

require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    backupDbUrl: process.env.BACKUP_DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    stripeKey: process.env.STRIPE_SECRET_KEY,
};