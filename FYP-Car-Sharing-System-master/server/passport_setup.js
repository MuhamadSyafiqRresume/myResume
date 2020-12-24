let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require ('bcrypt');
let models = require('./models')

const validPassword = function(user, password) {
    // console.log(bcyypt.compareSync(password, user.password))
    return bcrypt.compareSync(password, user.password)
    
}

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        return done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
        models.users.findOne({
            where: {
                'id': id
            }
        }).then(user => {
            if(user == null){
                return done(new Error('Cannot find user')) 
            }
            return done(null, user);
        })
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        return models.users.findOne({
            where: {
                'username' : username // SELECT * FROM users WHERE username = 'username'
            }
        }).then(user => {
            // console.log(user)
            if (user == null){
                console.log("1")
                return done(null, false, {'err': 'noUserExist'})
            } else if(user.password == null || user.password == undefined){
                console.log("2")
                return done(null, false, {'err':'passswordProblem'})
            } else if (!validPassword(user, password)) {
                console.log("3")
                console.log("password is wrong");
                return done(null, false, {
                    err: 'incorrectPwdUsername'
                })
            } else{

            }
            console.log("User below")
            console.log(user)
            return done( null, user)
        }).catch(err => {
            console.log(err)
            done(err, false)
        })
    }

    ))
}