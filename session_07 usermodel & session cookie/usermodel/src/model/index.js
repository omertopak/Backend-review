"use strict"
const { mongoose } = require('../config/dbConnection')


const userSchema = new mongoose.Schema({
        name:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            trim:true
        }
},{collection: 'Users', timestamps: true 
})
module.exports = mongoose.model('User',userSchema)