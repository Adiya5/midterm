const userModel = require('../models/user')
const bcrypt = require ('bcryptjs')
class userService{

    async registration (username,email,password){
        const candidate = await userModel.findOne({email: email})
        if (candidate){
            throw new Error(`This ${email} is already used`)
        }
        const hashPassword = await bcrypt.hash(password, 7);
        await userModel.create({username: username, email: email, password: hashPassword})
    }

    async login (email,password){
        const candidate = await userModel.findOne({email: email})
        if (!candidate){
            throw new Error(`There is no user with ${email}`)
        }
        const isValid = bcrypt.compareSync(password, candidate.password)
        if (!isValid){
            throw new Error(`Invalid password`)
        }
    }
}


module.exports = new userService()