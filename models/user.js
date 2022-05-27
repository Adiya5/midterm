const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");
//const passportLocalMongoose=require('passport-local-mongoose')
//const passport=require('passport')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
//schema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });
//schema.plugin(passportLocalMongoose)
const user = new mongoose.model('User', schema);
/*passport.use(user.createStrategy())
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())*/
module.exports = user;