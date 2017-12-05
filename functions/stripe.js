const functions = require('firebase-functions');
const database = require('./firebaseInit').database;

const stripeSecretKey = functions.config().stripe.key;
const stripe = require('stripe')(stripeSecretKey);

module.exports = {
  createCustomer: function(query) {
    let { stripeToken, email, uid } = query;
    let userRef = database.ref("users").child(uid);

    return new Promise(function(resolve, reject) {      
      stripe.customers.create({
        email: email,
        source: stripeToken,
      }).then(function(customer) {
        // Save the customer ID and other info in Firebase
        userRef.update({
          "stripeCustomerId": customer.id
        });
        resolve('success');
      }).catch((err) => {
        console.error(err);
        reject(err);
      })
    });
  },

  getCards: function(query) {
    let { stripeCustomerId } = query;

    return new Promise(function(resolve, reject) {
      stripe.customers.listCards(stripeCustomerId, function(err, cards) {
        resolve(cards);
      });
    });
  },

  deleteCard: function(query) {
    let { stripeCustomerId, cardId } = query;
    return new Promise(function(resolve, reject) {
      stripe.customers.deleteCard(stripeCustomerId, cardId, function(err, confirmation) {
        resolve(confirmation);
      });
    });
  },

  addCard: function(query) {
    let { stripeCustomerId, stripeToken } = query;
    return new Promise(function(resolve, reject) {
      stripe.customers.createSource(stripeCustomerId, {
        source: stripeToken
      }, function(err, confirmation) {
        resolve(confirmation);
      });
    });
  },

  createCharge: function(query) {
    let { amount, currency, stripeCustomerId, description } = query;

    return stripe.charges.create({
      amount: amount,
      currency: currency,
      customer: stripeCustomerId,
      description: description
    });
  },

  createSubscription: function(query) {
    let { plan, stripeCustomerId } = query;

    return stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{
        plan: plan // eg. "RiseMonthly"
      }]
    });
  }
};
