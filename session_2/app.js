/* ExpressJS Start */
const express = require('express'); //! Assing expressFramework to express variable.
const app = express() //! run application on express.

/* ENV */
require('dotenv').config()  //!process.env bu modul ile yakaladi
const PORT = process.env.PORT || 8000





app.listen(PORT,()=> console.log(`Running on ${PORT}`))