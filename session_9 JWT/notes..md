JWT
    secret_key + data + sign
    data secret key ile sifrelenir ve imza ile kiyaslanir imza ile sifrenemis veri ayni ise guvenilir kabul edilir.

nasil calisir?
    username ve password backende gonderilir
    backend jwt yi frontende gonderir
    frontend bu kodu saklar ve backende header da bu kodu gonderir (Bearer)
    gelen kullanici bilgisine gore kullanici yetkilendirilir.
    
    30dk -> access token ->username firstname lastname profileurl, isAdmin, isLogin
    72sa -> refresh token-> id, password
    refresh token access token i yeniler.

//?AUTH.CONTROLLER
    const accessData = {
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                        isLead: user.isLead,
                    }

                    const refreshData = {
                        username: user.username,
                        password: user.password
                    }
   token uretme yani imzalayip kilitleme
                    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '10m' })
   const accessToken = jwt.sign(DATA, ACCESS_KEY , { expiresIn: 'EXPIRY_TIME' })
                    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' })
   
    aslinda access token ile refresh token arasinda fark yoktur. Sadece farkli amaclarla kullanmatyi amacliyoruz. Ayni secret key ile sifrelememizin sebebi guvenligi arttirmayi amacladigimiz icindir.

                     res.send({
                        error: false,
                        token: {
                            access: accessToken,
                            refresh: refreshToken
                        }
                    })

    response ile access ve refresh token geldikten sonra autherization altinda header ile bearer kodu ile gelecek olan kisimdayiz