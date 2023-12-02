"use strict";


/* ExpressJS Start */
const express = require('express');
const app = express() 

/* ENV */
require('dotenv').config()  
const PORT = process.env.PORT || 8000
/* ------------------------------------------------------- */
 
//? Send routing to Router: index js e yolladik.
//? const router = express.Router()
//? router.get('/', (req, res) => { res.send({ message: 'Home Page' }) })
//? router.get('/about', (req, res) => { res.send({ message: 'About Page' }) })
//? router.get('/user/:userId', (req, res) => { res.send({ message: 'User Page' }) })
//? app.use(router) //!Router to App: Ayni zamanda app.route yapmamizi da saglar
/* ------------------------------------------------------- */



const router = require('./routes/')
app.use(router)
app.use('/company',router)  //!bu sekilde kullanirsak /company/about da calisir yani link te degisiklik yapilabilir hale geldi


// const router = require('./routes/')
// app.use(router)

// app.use(require('./routes/'))

// app.use('/user', require('./routes/user'))





/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
app.listen(PORT,()=> console.log("Running: http://127.0.0.1:" + PORT)) 
/* ------------------------------------------------------- */