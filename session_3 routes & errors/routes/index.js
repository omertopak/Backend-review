"use strict";

// const express = require('express');
// const router = express.Router()

const router = require('express').Router()

const routeControl = (req, res, next) => {

    const { username } = req.query

    if (username == 'omer') {
        next()
    } else {
        res.send({
            message: 'Wrong Username'
        })
    }
}

// We can use middleware with router:
router.use(routeControl)

router.get('/', (req, res) => { res.send({ message: 'Home Page' }) })
router.get('/about', (req, res) => { res.send({ message: 'About Page' }) })
router.get('/user/:userId', (req, res) => { res.send({ message: 'User Page' }) })

module.exports = router