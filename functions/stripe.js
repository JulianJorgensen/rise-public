let functions = require('firebase-functions');
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase); // firebase is autopopulated when deploying using Firebase CLI
let db = admin.database();

let stripeSecretKey = functions.config().stripe.key;
let stripe = require('stripe')(stripeSecretKey);

module.exports = {
  createCustomer: function(query) {
    let { stripeToken, email, uid } = query;

    console.log('query: ', query);
    console.log('stripe Token: ', stripeToken);
    console.log('email: ', email);
    console.log('using UID: ', uid);

    let userRef = db.ref("users").child(uid);

    return stripe.customers.create({
      email: email,
      source: stripeToken,
    }).then(function(customer) {
      // Save the customer ID and other info in Firebase
      userRef.update({
        "payment/stripeCustomerId": customer.id
      });
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
    console.log('deleting card...');
    console.log('stripeCustomerId: ', stripeCustomerId);
    console.log('cardId: ', cardId);
    return new Promise(function(resolve, reject) {
      stripe.customers.deleteCard(stripeCustomerId, cardId, function(err, confirmation) {
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
      items: [
        {
          plan: plan // eg. "RiseMonthly"
        }
      ]
    });
  }
};
