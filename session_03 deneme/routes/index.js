"use strict"

// const express = require('express')
// const router = express.Router()
const router = require('express').Router()

const func = (req,res,next) =>{
    const {user} = req.query

    if(user){
        next()
    }else{
        res.send("try again")
    }
}

router.use(func)
.get("/",(req,res)=>{res.send('home')})

module.exports = router