/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport')

module.exports = {

  login (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        res.status(401);
        return res.send({
          message: 'Username or password is wrong!',
          err: err
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          res.status(401);
          return res.send({
            message: err
          });
        }
        // res.send({
        //   ok: 1
        // });
        res.redirect('/')
      });
    })(req, res);
  },

  info (req, res){
    res.send(req.user)
  }

};

