let sendMail = require('./sendMail');

// admin emails
let adminEmails = [];
if (process.env.NODE_ENV === 'production') {
  adminEmails = [
    {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
    {name: 'RISE Admin', address: 'rise@riseeliteathletes.com'},
    {name: 'Rebecca Soni', address: 'soniswim@gmail.com'},
    {name: 'Julia Kozlov', address: 'busklub@gmail.com'}
  ]
} else if(process.env.NODE_ENV === 'staging') {
  adminEmails = [
    {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
    {name: 'RISE Admin', address: 'rise@riseeliteathletes.com'},
    {name: 'Rebecca Soni', address: 'soniswim@gmail.com'},
    {name: 'Julia Kozlov', address: 'busklub@gmail.com'}
  ]
} else {
  adminEmails = [
    {name: 'Dev Julian Jorgensen', address: 'me@julianjorgensen.com'}
  ]
}

// send alert to admin
let send = function(body) {
  let promise = new Promise(function(resolve, reject){
    let {message, userData} = body;
    let {uid, firstName, lastName, email, role} = userData;

    console.log('sending to: ', adminEmails);

    let mailOptions = {
      from: {name: 'RISE Robot', address: 'no-reply@rise-athletes.com'},
      to: adminEmails,
      subject: `New ${role} setup`,
      template: {
        name: `./emails/templates/adminAlertEmail.pug`,
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
