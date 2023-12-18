"use strict"
const express = require('express')
const app = express()

require('dotenv').config()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 8000
//---------------------------------
const func1 = (req,res,next)=>{
    
    const skip = req.query.skip || false
    req.data = "request data"
    res.data = "res  data"
    if (skip){
        res.redirect("/abc")
    }else{
        next()
    }

}

const func2 = (req,res,next)=>{
    req.data2 = "request data2"
    res.data2 = "res  data2"
    next()
}

app.get('/',[func1,func2],(req,res)=>{
    res.send({
        data:[
            req.data2,
            res.data2]
    })
})
app.get('/abc',(req,res)=>{

    res.send(
       "abc"
    )
})
//---------------------------------
//---------------------------------
//---------------------------------
app.listen(PORT,HOST,()=>console.log(`running on http://${HOST}:${PORT}`))
//---------------------------------



