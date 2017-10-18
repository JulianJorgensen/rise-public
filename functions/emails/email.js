let sendMail = require('./sendMail');

// send email
let send = function(body) {
  let promise = new Promise(function(resolve, reject) {
    let { toName, toEmail, subject, template } = body;

    let mailOptions = {
      from: {name: 'RISE', address: 'no-reply@rise-athletes.com'},
      to: [{name: toName, address: toEmail}],
      'h:Reply-To': 'rise@rise-athletes.com',
      subject,
      template: {
        name: `./emails/templates/${template || 'defaultEmail.pug'}`,
        engine: 'pug'
      }
    };
    console.log('sending default email with params', body);
    
    sendMail(mailOptions).then((res) => {
      resolve();
    }).catch((err) => {
      console.log('Error: Something went wrong when sending the default email...', err);
      reject();
    });
  }).catch((err) => {
    console('Error: ', err);
  });
  return promise;
};

module.exports.send = send;
