const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

// const User = mongoose.model('User');
const User = require('../model/User')

// passport.use(new LocalStrategy)({
//     user_email_field:'user[email]',
//     password_field:'user[password]',
// },(email,password,done) => {
//     try{
//         let user = User.findOne({email:email})
//         if(!user || !user.validatePassword(password)) {
//             return done(null, false, { errors:'Invalid email or password'});
//           }
    
//           return done(null, user);
//     }
//     catch(err){
//         return done(err)
//     }
    
// })

passport.use(new LocalStrategy({
    emailField: 'user[email]',
    passwordField: 'user[password]',
  }, (email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if(!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      }).catch(done);
  }));


