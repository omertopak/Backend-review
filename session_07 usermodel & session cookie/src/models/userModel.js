"use strict"
const mongoose =require('mongoose')
const passwordEncrypt = require('../helpers/passwordEncrypt')

const userShema = new mongoose.Schema({

    email:{
        type: String,
        trim:true,
        unique:true,
        required:[true,'email field must be required.'],
        validate: [
            (email) => (email.includes('@') && email.includes('.')), // ValidationCheck
            'Email type is incorrect.' // If false Message.
        ]
    },
    password:{
        type:String,
        trim:true,
        required:true,
        set: (password)=> passwordEncrypt(password)
    },
    firstname: String,
    lastmname: String,
},
{
    collection:'users',
    timestamps:true,
})
module.exports = mongoose.model('User',userShema)