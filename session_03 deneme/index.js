"use strict"

const express = require("express")
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000
//---
const router = require("./routes/index")
app.use(router)
//---


app.listen(PORT,()=>console.log(`running on http://127.0.0.1:${PORT}`))