const { stripeKey } = require('../config')

const Stripe = require('stripe');
const stripe = Stripe(stripeKey);

module.exports = stripe;
