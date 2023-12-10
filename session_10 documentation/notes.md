//? DEBUGGING 
    express js in yaptigi islemleri adim adim gosterme.
    aktif hale gecirmek icin; >>>> DEBUG=* nodemon <<<< baslatma komutudur. Bu arka planda yapilan tum islemleri terminalde gosterir.
    >>>> DEBUG=express:* nodemon <<<< bu komut ise sadece express in yaptigi islemleri gosterir. burada ne ile ilgili sureci gormek istiyorsak onu da yazabiliriz.

//? LOGGING
    npm i morgan
    logging islemi indexjs te takip edilir. morgan bir middleware dir.
        const morgan = require('morgan')
        app.use(morgan('tiny'))   //minimal detaylari gosterir
        app.use(morgan('combined'))  //tarih saat ve yapilanlara dair detayli bi cikti verdi.baglantinin ne uzerinden gerceklestigini de gorebiliriz.

    //writing logs for file;
        const filesystem = require('node:fs')
        app.use(morgan('combined',{
            stream: filesystem.createWriteStream('./access.log',{flags:'a'})
        })) 

    createWriteStream, filesystemde dosya actik.
    access.log ismini dosyaya verdik.
    flags:'a' dosya yoksa ac varsa uzerine yaz.
    
    artik bizim log kayitlarimiz terminalde degilde access.log isimli klasorumuzde olusmaya basladi.

    hep ayni dosyada logging yapilmasi dosyayi sisirir. Bu sebebple bunu parcalayabiliriz.
        const now = new Date()
        const today = now.toISOString().split('T')[0]  //?toISOString tarih formatini degistirdi.
        app.use(morgan('combined', {
            stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })  //varsa ustune yazar yoksa yeni olusturur.
        }))

    //? SWAGGER
    Swagger-autogen routerlari ziyaret eder ve swagger olusturur.
    npm i swagger-autogen

        //basic settings
        info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "http://www.clarusway.com",
		contact: { name: packageJson.author, email: "qadir@clarusway.com" },
		license: { name: packageJson.license, },
	    },
	    host: `${HOST}:${PORT}`,
	    basePath: '/',
	    schemes: ['http', 'https'],
     //jwt settings
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: 'Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>'
            }
        },
        security: [{ "JWT": true }],


        //?routes nerede toplaniyor.
            const routes = ['./index.js']
        //?bana verecegi swagger json dosyasini nerede verecek
            const outputFile = './swagger.json'

        //? swaggerAutogen(hangidosyaya,nereyi tara,hangi ayarlari kullan)
            // Create JSON file:
            swaggerAutogen(outputFile, routes, document)


    tum ayarlar yapildiktan sonra terminale de node swagger.js calistirilir.
    aslinda node file_name.js calistirilir.

    bu dosya json olusturan bir dosyadir ve json verimizi olusturduk.