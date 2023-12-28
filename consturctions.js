/* ExpressJS Start */
const express = require('express'); //! Assing expressFramework to express variable.
const app = express() //! run application on express.

/* ENV */
require('dotenv').config()  //!process.env bu modul ile yakaladi
const PORT = process.env.PORT || 8000
/*--------------------------------------------------------------------------*/
app.listen(PORT,()=> console.log(`Running on http://127.0.0.1:${PORT}`))



/*--------------------------------------------------------------------------*/


//? MIDDLEWARE

const middleFunction1 = (req, res, next) => {

    
    const skip = req.query.skip ?? false  //!query den aldik

    req.customData = 'Custom Data With Request'
    res.customDataWithResponse = 'Custom Data With Response'

    if (skip) {
        
        // Bir sonraki route'a (bağımsız fonksiyona) git, callback calismaz.
        next('route')

    } else {
        // Bir sonraki callback fonksiyona git:
        next()

    }
}

const middleFunction2 = (req, res, next) => {

    // next()  
    
    res.send({
        customData: [
            req.customData,
            res.customDataWithResponse
        ],
        message: "Here is func2, next() runned"
    });

}

// //? It can be in array:
app.get('/', [ middleFunction1, middleFunction2 ], (req, res) => { //!mf1 ve mf2 de next lenen veri buraya gelir.
    res.send({
        customData: [
            req.customData,
            res.customDataWithResponse
        ],
        message: 'Welcome to Home'
    })
})
//!import
//const [ middleFunction1, middleFunction2 ] = require('./middlewares.js')    //!ya da 


/*--------------------------------------------------------------------------*/
//? ROUTES
const router = require('express').Router()

const routeControl = (req, res, next) => {

    const { username } = req.query

    if (username) {
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

/*--------------------------------------------------------------------------*/
//? MODEL
const { mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
        name:{
            type:String,
            trim:true
        },
        
},{collection: 'Users', timestamps: true 
})
// timestamps: {
//     createdAt: 'publish_date', 
//     updatedAt: 'update_date'
// } 
module.exports = mongoose.model('User',userSchema)

//? CONTROLLER

const User = require("../model/index") 

module.exports = {

    list:async (req,res)=>{

        const data =await User.find()

        res.status(200).send({
            error:false,
            user:data,

        })
    },
}

//? ROUTE

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

//? index

app.use('/user',require('./src/routes/userRoute'))

/*--------------------------------------------------------------------------*/
//? SEARCH SORT PAGINATION

"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Searching & Sorting & Pagination:

module.exports = (req, res, next) => {    

    // SEARCHING: URL?search[key1]=value1&search[key2]=value2
    const search = req.query?.search || {}
    // console.log(search)
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' } // i: case Insensitive
    // console.log(search)

    // Cancelled -> SORTING: URL?sort[key1]=1&sort[key2]=-1 (1:ASC, -1:DESC)
    // mongoose=^8.0 -> SORTING: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
    const sort = req.query?.sort || {}
    // console.log(sort)

    // PAGINATION: URL?page=1&limit=10
    // const limit = req.query?.limit || 20
    // let limit = req.query?.limit || (process.env?.PAGE_SIZE || 20)
    // limit = Number(limit)
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
    // console.log('limit', typeof limit, limit)

    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1 // Backend'de sayfaNo her zaman -1'dir.
    // console.log('page', typeof page, page)

    let skip = Number(req.query?.skip) // İstenirse url'de ?skip=10 gibi değer gönderilebilir.
    skip = skip > 0 ? skip : (page * limit)
    // console.log('skip', typeof skip, skip)

    // RUN:
    req.getModelList = async (Model, populate = null) => {

        return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    // Details:
    req.getModelListDetails = async (Model) => {
        const data = await Model.find(search)
        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}

/*--------------------------------------------------------------------------*/
//? JWT secret_key+data+sign
// token uretme yani imzalayip kilitleme
    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '10m' })
  //const accessToken = jwt.sign(DATA, ACCESS_KEY , { expiresIn: 'EXPIRY_TIME' })
    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' })
   

    jwt.verify (accessToken, secret_KEY , function(err, user){retun DATA})
//! yetkilendirme
    jwt.verify (accessToken, process.env.ACCESS_KEY, function(err, user) {
        if (err) {
         req.user = null
         console.log('JWT Login: NO')
        } else {
       req.isLogin = true
           req.user = user
            //eq.user = user.isActive ? user : null
           console.log('JWT Login: YES')
   }
      })

/*--------------------------------------------------------------------------*/
//? debugging
//DEBUG=* nodemon

/*--------------------------------------------------------------------------*/
//? Logging
//npm i morgan
const morgan = require('morgan')
const fs = require('node:fs')

// fs.mkdirSync('./logs', { recursive: true })

const now = new Date()
const today = now.toISOString().split('T')[0]

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
})

//index
// Run Logger:
app.use(require('./src/middlewares/logger'))

/*--------------------------------------------------------------------------*/

