const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const therapistSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    specialization:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true

    }


})

// static signup method
therapistSchema.statics.signup = async function(name,email,specialization,password){

    //validation
    if(!name|| !specialization|| !email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter valid email address')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const therapist = await this.create({name,email,specialization,password:hash})

    return therapist
}

//static login methon

therapistSchema.statics.login=async function(email,password){
    const therapist = await this.findOne({email})

    if(!therapist){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password,therapist.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return therapist

}

module.exports = mongoose.model('Therapist',therapistSchema)