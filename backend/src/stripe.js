
// So this is the same as thae last line:
// const stripe = require('stripe');
// const config = stripe(process.env.STRIPE_SECRET);
// module.exports = config;

module.exports = require('stripe')(process.env.STRIPE_SECRET);
