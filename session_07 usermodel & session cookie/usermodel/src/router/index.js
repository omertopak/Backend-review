"use strict"

const router = require('express').Router()
const User = require('../controller/index')


router.route('/')
.get(User.list)
.post(User.create)


router.route('/:userId')
.get(User.read)
.put(User.update)
.delete(User.delete)

module.exports = router