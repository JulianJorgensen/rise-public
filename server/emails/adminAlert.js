let sendMail = require('./sendMail');

// send alert to admin
let send = function(body) {
  let promise = new Promise(function(resolve, reject){
    let {message, userData} = body;
    let {uid, firstName, lastName, email, role} = userData;

    let mailOptions = {
      from: {name: 'RISE Robot', address: 'no-reply@rise-athletes.com'},
      to: {name: 'RISE Admin', address: 'rise@riseeliteathletes.com'},
      subject: `New ${role} setup`,
      template: {
        name: `./server/emails/templates/adminAlertEmail.pug`,
        engine: 'pug',
        context: {
          title: `New ${role} setup`,
          message,
          uid,
          firstName,
          lastName,
          email
        }
      }
    };

    sendMail(mailOptions).then(() => {
      resolve();
    }).catch((err) => {
      console.log('Error: Something went wrong when sending the admin alert email...', err);
    });
  }).catch((err) => {
    console('Error: ', err);
  });
  return promise;
};

module.exports.send = send;
