let express = require('express');
let router = express.Router();
let adminAlertEmail = require('../emails/adminAlert');

router.route('/new-user-setup')
  .post(function (req, res) {
    console.log('req.body: ', req.body);
    adminAlertEmail.send(req.body).then(() => {
      res.status(200).send('success');
    });
  });

module.exports = router;
