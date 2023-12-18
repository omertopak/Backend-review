"use strict";


/* ExpressJS Start */
const express = require('express');
const app = express() 

/* ENV */
require('dotenv').config()  
const PORT = process.env.PORT || 8000
/* ------------------------------------------------------- ERROR TEST */

//? app.get('/user/:id', (req, res) => {
//?     const id = req.params.id ?? 0
//?     if (isNaN(id)) {
//?         res.statusCode = 400
//?         throw new Error('ID is Not A Number', { cause: 'params.id='+id })
//?     } else {
//?         res.send({ 
//?             error: false, 
//?             id: id
//?         })
//?     }
//? })
/* ------------------------------------------------------- */
//her hata icin ayri try catch yazmamiz gerekli bu yontemle
//? app.get('/user/:id', (req, res, next) => {

//?     try {
//?         const id = req.params.id ?? 0
//?         if (isNaN(id)) {
//?             throw new Error('ID is Not A Number', { cause: 'params.id='+id }) //! hata var ise asagida yakaladik ve json mesaj yolladik
//?         } else {
//?             res.send({ 
//?                 error: false, 
//?                 id: id
//?             })
//?         }
//?     } catch (err) {

//?         console.log('try-catch runned')
//?         // next(err) // Go to errorHandler()

//?         res.send({ 
//?             error: true, 
//?             message: err.message,
//?             cause: err.cause
//?         })
//?     }
/* ------------------------------------------------------- */
 app.get('/user/:id', (req, res, next) => {

     try {
         const id = req.params.id ?? 0
         if (isNaN(id)) {
             throw new Error('ID is Not A Number', { cause: 'params.id='+id }) //! hata var ise asagida yakaladik ve json mesaj yolladik
         } else {
             res.send({ 
                 error: false, 
                 id: id
             })
         }
     } catch (err) {

         console.log('try-catch runned')
         next(err) //! Go to errorHandler()

        //  res.send({ 
        //      error: true, 
        //      message: err.message,
        //      cause: err.cause
        //  })
     }
    })
/* ------------------------------------------------------- */
//*ASYNC
const asyncHandler = require('express-async-handler')

app.get('/async', asyncHandler(async (req, res, next) => {
    res.errorStatusCode = 400
    throw new Error('Created error in async-func')
}))
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
//! sen 4 parametreli middleware yaz ben hata olursa buraya gondereyim.Yani hata yakalamaya ozel bir middleware.
    const errorHandler = (err, req, res, next) => {

    const statusCode = res.errorStatusCode ?? 500

    console.log('errorHandler runned')
    console.log(err)

    res.status(statusCode).send({ 
        error: true, // special data
        message: err.message, // Error string Message
        cause: err.cause, // Error optional cause
        stack: err.stack, // Error Details.
        umut: err.umut
    })
}
//? for run errorHandler call in use.
//? It must be at last middleware.
app.use(errorHandler)
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

/* ------------------------------------------------------- */
app.listen(PORT,()=> console.log("Running: http://127.0.0.1:" + PORT)) 
/* ------------------------------------------------------- */