const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('./db').Users

passport.use(new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password'
    }
    ,function(username,password,done){
        console.log(username)
        Users.findOne({
            where:
            {username:username}
        }).then((user)=>{
            if(!user){
                return done(null,false)
            }
            if(user.password != password){
                return done(null,false)
            }
            done(null,user)
        }).catch(done)
    }
))

passport.serializeUser(
    function(user,done){
        done(null,user.id)
    }
)

passport.deserializeUser(
    function(userId,done){
        Users.findByPk(userId).then((user)=>{
            done(null,user)
        }).catch(done)
    }
)

module.exports = passport