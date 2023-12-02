/* ExpressJS Start */
const express = require('express'); //! Assing expressFramework to express variable.
const app = express() //! run application on express.

/* ENV */
require('dotenv').config()  //!process.env bu modul ile yakaladi
const PORT = process.env.PORT || 8000
/*--------------------------------------------------------------------------*/

// Middleware:
app.get('/', (req, res, next) => {

    //! Request/Response parametresi ile next() metoduna veri gönderebilirim.
    req.customData = 'Custom Data With Request'
    res.customDataWithResponse = 'Custom Data With Response'
    
    next() // Go to next Function.
    
    //! next() komutundan sonra çıktı vermek anlamsız olacaktır. (Hata verecektir.)
    // res.send({
    //     message: 'Middleware running'
    // })
})

//! next() komutu req ve res verilerini next ile sonraki fonksiyona tasinir.
app.get('/', (req, res) => {
    res.send({
        customData: [
            req.customData,
            res.customDataWithResponse
        ],
        message: 'Welcome to Home'
    })
})


/*--------------------------------------------------------------------------*/

//? next() for next callBackFunction:
const middleFunction1 = (req, res, next) => {

    // console.log( req.query )
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

// //? add to function like callBack:
// app.get('/', middleFunction1, middleFunction2, (req, res) => { ... }
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

// next('route') ile çalıştı:
app.get('/', (req, res) => {
    res.send({
        message: 'next route'
    })
})
/*--------------------------------------------------------------------------*/
//!import
//const [ middleFunction1, middleFunction2 ] = require('./middlewares.js')    //!ya da 

// const middleFunctions = require('./middlewares.js')
// app.use(middleFunctions)

app.get('/*', (req, res) => {
    res.send({
        message: 'Welcome to Home'
    })
})

/*--------------------------------------------------------------------------*/
app.listen(PORT,()=> console.log(`Running on ${PORT}`))