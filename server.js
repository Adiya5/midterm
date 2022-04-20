const express = require("express");
const app = express();
const port = 3000;
const rest = require("restler");
const ejs = require("ejs");
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

//app.use("/", require("./routes"));
app.get('/',(req, res) => {
    res.render(__dirname+"/views/index.ejs")
})

app.post('/',((req, res) => {
    let obj=req.body.obj
    let apikey="d089cc80-b7ea-4833-a602-ade21f025269"

    rest.get("https://api.harvardartmuseums.org/object", {
        query: {
            apikey: apikey,
            title: obj,
            fields: "title, description",
        }
    }).on("complete", function(data, response) {
        console.log(data);
        let str=JSON.stringify(data)
        let json=JSON.parse(str)
        let ur = json.records[0].title
        console.log(ur)
        let erl=json.records[1].description
        //let erl=json.records[1].images[0].baseimageurl
        console.log(erl)
        res.send("Title: "+ur+". Description: "+erl)
    });
}))
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/list", require("./routes/list"));
app.use("/profile", require("./routes/profile"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
