const express = require("express")
const request = require("request")
const cheerio = require("cheerio")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var url = "https://time.com";
app.get('/', async (req, res) => { 
    res.setHeader('Content-Type', 'application/json');

    var jsondata = [];
    await request({ url, json: true }, function (error, response, html) {
        if(error) { 
            res.json(error); 
        }
        var $ = cheerio.load(html);
        $(".latest-stories ul li").each(function (i, ele) {
            const anchor = $(this).find('a');
            const link = url + $(anchor).attr("href");
            const title = $(anchor).find("h3").text();            
            jsondata.push({ link, title });
        });  
        res.json(jsondata);      
    })  
})

app.listen(5050, function  (){
    console.log("server is listening on port 5050")
})
