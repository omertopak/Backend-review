referans i verdikten sonra 
  blogCategoryId: {
        type: mongoose.Schema.ObjectId, // Relational ObjectId
        ref: 'BlogCategory', // ModelName
        ^^^^^^^^^^^^^^^^^^^
        required: true,
    },

bu referansi blog cagirip gormek istefdimizde sadece id gelir fakat biz alt tablodan use tablo verisi istersek yani id ye ait categorynin tum ozelliklerini gormek istersek get istegi attimiz linkteki read altina;
  read: async (req, res) => {

        // req.params.postId
        // const data = await BlogPost.findById(req.params.postId)
        const data = await BlogPost.findOne({ _id: req.params.postId }).populate('blogCategoryId') // get Primary Data
                                                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^
        res.status(200).send({
            error: false,
            result: data
        })
    },
    
seklinde populate() fonksiyonu cagirilarak neyin populate edilecegi belirtilmelidir.


category adi altinda listeleme icin find ile filter yapilabilir;
  listCategoryPosts: async (req, res) => {

        const data = await BlogPost.find({ blogCategoryId: req.params.categoryId }).populate('blogCategoryId')
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },



    user model ayni sekilde olusturuldu.
    validation ise model uzerinde yapilir.


    validasyon modelini yaptiktan sonra update e de validasyon zorunlulugu koymak icin { runValidators: true } seklinde update e eklenmelidir.

    set metodu gelen veriyi fonksiyonda calistirir ve cikti olarak onu verir. bunun amaci gelen veri db de oldugu gibi saklanmaz bunun onune gecmek icin algoritmadan gecirilir ve oyle saklanir
        - pbkdf2 (cryptograpy) 

    https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
    const crypto = require('node:crypto')

    node module icinde gelen crypto modulu kullanilir. eger iki nokta ustuste ile cagiriyorsak halihazirda vardir anlamina gelir.
    .env de SECRET_KEY olusturulur ve sifreleme icin o kullanilir.
    loop_count belirlenir ve kac kez sifrelenecegine karar verilir. 
    charsCount kac hane olacagini
    encType sifreleme turudur  sha128  sha256  sha512

    const keyCode = process.env.SECRET_KEY || 'write_random_chars_to_here'
    const loopCount = 10_000
    const charsCount = 32 // write 32 for 64
    const encType = 'sha512'

    module.exports = function (password) {
    const encode = crypto.pbkdf2Sync(password, keyCode, loopCount, charsCount, encType) // return BufferType
    return encode.toString('hex')
}

buradaki hex bana ciktiyi hexadesimal olarak ver demek.

pbkdf2Sync sadece encode yapar decode yapmaz. sifreye ulasilamaz.
neden decode ihtiyaci olur ornegin tc kimlik numarasi gizli olmali ama ihtiyac halinde de kullanilmali bunun icin decode yapan moduller kullanilmali.

login isleminde sistemde user ve password eslemesi yaparken gelen password tekrardan sifrelenerek aranmaz cunku mongoose da model olustururken yazdigimiz set metodu findOne() ile calisir. bu sebeple tekrardan sifreleme yaparak aranmaz.

login icin gecis izni vermek authentication dir. fakat bunun bir yerde saklanmasi lazim iste bu session cookie dir.
    // http://expressjs.com/en/resources/middleware/cookie-session.html
    // https://www.npmjs.com/package/cookie-session
    //* $ npm i cookie-session
index js te;
app.use(session({
    secret: process.env.SECRET_KEY || 'secret_keys_for_cookies',
    // name: 'cookie', // default: req.session
    // maxAge: 1000 * 60 * 60 * 24 // 1 day (miliseconds) 
    //! max age tanimlanirsa session olur tanimlarsam cookie olur.
}))
  tanimlanir. Ama suan sadece ayar yaptik kullanmak icin user bilgilerinin in onay aldigi gecis izninin verildigi yerde en ustte ;
      req.session = {
                    user: {
                        email: user.email,
                        password: user.password
                    }
                }
    seklinde tanimlanir.
REMEMBER ME?
    // Set Cookie :
        if (req.body?.rememberMe) {
            // Set Cookie maxAge:
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
            }

buradaki session cookie islemleri herhangi bi kayit yapmaz sadece session cookie ye gider ve orada json verimizi kaydeder ve silinecegi zamanin kaydini (istege bagli) da yapar.


logout session silme burada sessiondaki hersey silinmez cunku domain e gore siler.
      logout: async (req, res) => {
              // Set session to null:
              req.session = null
              res.status(200).send({
                  error: false,
                  message: 'Logout OK'
              })
          },