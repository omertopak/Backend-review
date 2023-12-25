//? user model
//? user controller 
//? user router
//? token model: token model login islemi yapan her bir kullanicinin tokenlerini saklayacagimiz yer
//? token controller
//? token routes
//? index js te token(simple token) ve user routes cagirilir.JWT ile yapmak istersek o cok basit jwt modulu hallediyor.
//? auth controller olusturulur ve burada login/refresh/logout sayfasindan gelen datanin sorgusu olusturulur. bu controllerda login  islemi basariliysa user_id ile zamani(unique olmasi icin) sifreledik ve bu datayi token.create ile olusturdugumuz token modeli formatinda kaydettik.
//? auth route olusturduk. All diyememe sebebimiz swagger. swagger all yakalayamaz.
//? authentication middleware i na gittik ve bir kullanici var mi yok mu kontrolunu yaptik. burada amac token veya jwt den gelen sifrelemeden token-bearer yakalandi ve devam ettik. gecis izni degil. burada sisteme giris yapan biri var mi yok mu onu sorguladik.
//?
//?