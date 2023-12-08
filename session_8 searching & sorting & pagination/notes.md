http://127.0.0.1:8000/blog/post?search[title]=123&search[content]=12312&sort[title]=1&sort[content]=-1&page=5&limit=20
search[title]=123&search[content]=12312
sort[title]=1&sort[content]=-1
page=5
limit=20
bu sayede search ve sort parametrelerini obje olarak yollariz.

bu kriterler controller icinde hazirlanir.

//Searching : URL?search[key1]=value1&search[key2]=value2
        //console.log(req.query);

        const search = req.query?.search || {}
        console.log(search);

        // const data = await BlogPost.find({title:'test 0 title'})
        const data = await BlogPost.find(search)

bu arama da birberi yazilan aranilir fakat biz icinden herhangi bir kelimeyi aramak icin;
    const data = await BlogPost.find({title:{$regex:test 0, $options:i}})
  
burada for dongusu ile birden fazla kriterde arama yapma saglanmis oldu.
  for (let key in search) search[key] = { $regex: search[key], $options: 'i' } // i: case Insensitive
        const data = await BlogPost.find(search)
//! regex, case sensitivity ve birebir yazma olayini ortadan kaldirir.

//?Sorting
sorting de 1 bastan sona  -1 sondan basa sirala demektir.
     const sort = req.query?.sort || {}
     console.log(sort)
     const data = await BlogPost.find(search).sort(sort)
sorting de sadece bu kadar yapmamiz yeterli.

//?LIMIT & SKIP
    limit
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
        // console.log('limit', typeof limit, limit)
    page
        let page = Number(req.query?.page)
        page = (page > 0 ? page : 1) - 1 // Backend'de sayfaNo her zaman -1'dir.
        // console.log('page', typeof page, page)
    skip
        let skip = Number(req.query?.skip) // İstenirse url'de ?skip=10 gibi değer gönderilebilir.
        skip = skip > 0 ? skip : (page * limit)
        // console.log('skip', typeof skip, skip)

        // RUN:
        // const data = await BlogPost.find().populate('blogCategoryId') // get Primary Data
        const data = await BlogPost.find(search).sort(sort).skip(skip).limit(limit).populate('blogCategoryId')