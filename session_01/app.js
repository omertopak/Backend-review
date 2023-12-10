//!  npm init -y
//!  npm i express dotenv

/* ExpressJS Start */
const express = require('express'); //! Assing expressFramework to express variable.
const app = express() //! run application on express.

/* ENV */
require('dotenv').config()  //!process.env bu modul ile yakaladi
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 8000

//?console.log(PORT);
//?console.log(HOST);

/* ------------------------------------------------------- */
//!app.metod_ismi('url', ( request, response )=>{calisacak olan callback})  hangi ulr de hangi metod calisacak ve ne olacak

app.get('/',(req,res)=> {
    res.send("Welcome to Express")
})
//!send tek basina yeterli veri tipini ne gonderirsen ona gore donusum yapar.

app.post('/', (request, response) => response.send({ message: "called in 'post' method."}))
app.put('/', (request, response) => response.send({ message: "called in 'put' method."}))
app.delete('/', (request, response) => response.send({ message: "called in 'delete' method."}))
//! "app.all" allow at all methods:
app.all('/', (request, response) => response.send({ message: "'all' option allows to all methods."}))

//!kisa yoldan routeing olusturma yontemi
app.route("/route")  //* "/route" adresindebunu yaptik
        .get( (req, res) => res.send('get') )
        .post( (req, res) => res.send('post') )
        .put( (req, res) => res.send('put') )
        .delete( (req, res) => res.send('delete') )

/* ------------------------------------------------------- */


//URL (Path) Options */

app.get('/', (req, res) => res.send("in 'root' path")) // '/' == root
app.get('/path', (req, res) => res.send("in 'path'")) // '/path' == '/path/'

//? express-urls supported JokerChar: 
    //!parantezler olsa da olmasa da olur.
app.get('/abc(x?)123', (req, res) => res.send("in 'abc(x?)123'")) //! abc123 or abcx123 yani x olsa da olur olmasa da
app.get('/abc(x+)123', (req, res) => res.send("in 'abc(x+)123'")) //! abcx123 or abcxx..xx123 yani x istedigin kadar tekrar edebilir
app.get('/abc*123', (req, res) => res.send("in 'abc*123'")) //! abc123 or abc...123 // abc(ANY)123  yani ne olursa olsun

//? express-urls supported regexp:
app.get(/xyz/, (req, res) => res.send("regexp /xyz/")) //! url xyz icerdigi surece kabul et
app.get(/^\/xyz/, (req, res) => res.send("regexp /^\/xyz/")) //! url startswith = 'xyz'
app.get(/xyz$/, (req, res) => res.send("regexp /xyz$/")) //! url endswith = 'xyz'
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

/* URL Parameters (req.params) */
     //* /user/66/config/update/?key=value
app.get('/user/:userId/config/:configParam/*', (req, res) => {
    res.send({
        userId: req.params.userId,
        configParam: req.params.configParam,
        url: {
            protocol: req.protocol,
            subdomains: req.subdomains,
            hostname: req.hostname,
            baseUrl: req.baseUrl,
            params: req.params,
            query: req.query,
            path: req.path,
            originalUrls: req.originalUrl
        }
    })
})

//? '\d' means only-digit-chars in regexp:
//? '\w' means only-chars in regexp:
// app.get('/user/:userId([0-9]+)', (req, res) => {
app.get('/user/:userId(\\d+)', (req, res) => { //!parantez icine kural yazilabilir
    res.send({
        params: req.params
    })
})

app.get('/command/:userId-:profileId', (req, res) => {  //! " - " ile iki farkli veri yakalanabilir.
    res.send({
        params: req.params
    })
})

/* ------------------------------------------------------- */

//? SendStatus:
app.get('/', (req, res) => res.sendStatus(404))
//? Status:
app.get('/', (req, res) => res.status(200).send({ message: 'OK' }))
app.post('/', (req, res) => res.status(201).send({ message: 'Created' }))
app.put('/', (req, res) => res.status(202).send({ message: 'Accepted' }))
app.delete('/', (req, res) => res.status(204).send({ message: 'No Content' }))
//? JSON (.send() method already does this converting.)
app.get('/', (req, res) => res.json([{ key: 'value' }]))
//? Download File (Download at browser):
app.get('/download', (req, res) => res.download('./app.js', 'changedName.js')) //!bu linkte app.js dosyasini indirip ismini de changedName.js yapti.
//? SendFile Content:
console.log( __dirname )  //!  /Users/omertopak/Desktop/BACKEND NOTES/tekrar    =>bulunulan path
app.get('/file', (req, res) => res.sendFile(__dirname + '/app.js')) // FilePath must be realPath
//? Redirect:
app.get('/google', (req, res) => res.redirect(301, 'https://www.google.com')) // 301 or 302
app.get('/redirect', (req, res) => res.redirect(302, '/thisPath')) // 301 or 302

/* ------------------------------------------------------- */

//app.listen(PORT,()=> console.log(`Running on ${HOST}:${PORT}`)) //!PORT dememizin sebebi bir port u dinle yani 8000 i dinlettik.bu kisim en sonda olmali cunku sayfa okunduktan sonra basilmali.
app.listen(PORT,HOST,()=> console.log(`Running on ${HOST}:${PORT}`)) //!PORT dememizin sebebi bir port u dinle yani 8000 i dinlettik.bu kisim en sonda olmali cunku sayfa okunduktan sonra basilmali.
/* ------------------------------------------------------- */