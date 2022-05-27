//require('dotenv').config();
const express = require("express");
const app = express();
//const port = 3000;
const rest = require("restler");
const ejs = require("ejs");
const bodyParser=require('body-parser')
const encrypt = require("mongoose-encryption");
const methodOverride = require('method-override');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport=require('passport')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(session({
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const UserRoute = require('./routes/User')
app.use('/',UserRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {router} = require("express/lib/application");
const path = require("path");
const UserController = require("./controllers/User");

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.get("/", (req, res) => res.render(path.resolve("./views/index.ejs")))
app.get("/edit", (req, res) => res.render(path.resolve("./views/edit.ejs")))
app.get("/list", (req, res) => res.render(path.resolve("./views/list.ejs")))
app.get("/login", (req, res) => res.render(path.resolve("./views/login.ejs")));
app.get("/register", (req, res) => res.render(path.resolve("./views/register.ejs")))
app.get("/profile", (req, res) => res.render(path.resolve("./views/profile.ejs")))


app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
