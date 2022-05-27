const userService = require ('../services/userService')

class UserController{
    async register(req,res){
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            console.log(username, email, password)
            // const {username, email, password} = req.body;
            const userData = await userService.registration(username,email,password);
            res.status(200).redirect('/login');
        }catch (e) {
            console.log(e);
        }
    }

    async login(req,res){
        try {
            const email = req.body.email;
            const password = req.body.password;
            await userService.login(email,password);
            res.status(200).redirect('/profile');

        }catch (e) {
            console.log(e);
        }
    }

}

module.exports = new UserController()

/*const UserModel = require('../models/user')

//const md5 = require("md5");
 const bcrypt = require("bcrypt");
 const {hash} = require("bcrypt");

const passport = require("passport");
exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hash
            //password: md5(req.body.password)
            //password: req.body.password
        });
        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.render("profile");
            }
        });
    })
};
exports.login = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    //const password = md5(req.body.password);
    await UserModel.findOne({email: email},function(err, foundUser){
    if (err) {
            res.send("404")
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser, function(err, result) {
                    if(result===true) {
                        res.render("profile");
                    }
                });
                //if (foundUser.password === password) {
                    //res.render("profile");
                //}
            }
        }
    })
}*/