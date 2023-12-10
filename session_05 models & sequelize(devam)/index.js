"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data & convert to object:
app.use(express.json())

/* ------------------------------------------------------- */

//* https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require('sequelize')
//* Where is DB (DB Connection Details):
// const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/todoCH14') // $ npm i pg pg-hstore
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))


/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler runned.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
        body: req.body,
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));