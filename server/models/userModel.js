const mongoose =  require('mongoose')
const Schema = mongoose.Schema 
const bcrypt = require('bcrypt')
const validator = require('validator')

const signupSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type:String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

//static signup method
signupSchema.statics.signup = async function(email, username, password)  {
    const exists = await this.findOne({username})
    const exists1 = await this.findOne({email})

    //validator

    if(!email || !password || !username)
    {
        throw Error("All fields must be filled");
    }

    if(!validator.isEmail(email))
    {
        throw Error("Email not valid")
    }

    if(!validator. isStrongPassword(password))
    {
        throw Error("Password must have atleast 1 Capital, 1 small and 1 unique character")
    }
    
    if(exists){
        throw Error('An account already exists with this username')
    }


    if(exists1){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, username, password:hash})

    return user
}

signupSchema.statics.login = async function(  username, password)  {
    const exists = await this.findOne({username})
    
    if(!password || !username)
    {
        throw Error("All fields must be filled");
    }

    if(!exists){
        throw Error('Username does not exist, please signup')
    }

    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password, salt);
    const user = await this.findOne({username})
    
    const match = await bcrypt.compare(password, user.password)

    // const user = await this.create({ username, password:hash})
    

    if(!match)
    {
        throw Error("Incorrect password");
    }
    return user
}

// mongoose.exports = mongoose.model('User', signupSchema)
const User= new mongoose.model('User', signupSchema)
module.exports=User;