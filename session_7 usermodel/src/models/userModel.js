const mongoose =require('mongoose')
const userShema = new mongoose.Schema({

    email:{
        type: String,
        trim:true,
        unique:true,
        required:[true,'email field must be required.']

    },
    password:{
        type:String,
        trim:true,
        required:true,

    },
    firstname: String,
    lastmname: String,

},{
    collection:'users',
    timestamps:true
})

module.exports = mongoose.model('User',userShema)