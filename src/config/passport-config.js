
const LocalStrategy = require("passport-local").Strategy;
const {validatePass} = require('../../src/utils/passValidator');
const {createHash} = require('../../src/utils/hashGenerator')
const usersDB = require("../models/Users");
const passport = require("passport");
const {sendNewUserMail} = require('../utils/mailManager');

passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        usersDB.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                return callback(null, false)
            }

            if(!validatePass(user, password)) {
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))



passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        usersDB.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (user) {
               return callback(null, false)
            }

            const newUser = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: username,
                address:req.body.address,
                age:req.body.age,
                cellphone:req.body.cellphone,
                password: createHash(password)
            }

            usersDB.create(newUser, (err, userWithId) => {
                if (err) {
                    return callback(err)
                }

                sendNewUserMail(newUser);

                return callback(null, userWithId)
            })
        })
    }
))

passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    usersDB.findById(id, callback)
})


module.exports = {passport}