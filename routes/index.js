const express = require("express");
const path = require("path");
const https = require('https');
const rest = require("restler");
const router = express.Router();
const ejs = require("ejs");
const bodyparser=require('body-parser')
const app=express()
app.use(bodyparser.urlencoded({extended:true}))
router
    .route("/")
    .get((req, res) => res.render(path.resolve("./views/index.ejs")))
    //.post((req, res) => res.send("POST"));
    .post((req, res) => {
        let obj = req.body.obj
        let apikey = "d089cc80-b7ea-4833-a602-ade21f025269"
        rest.get("https://api.harvardartmuseums.org/object", {
            query: {
                apikey: apikey,
                title: obj,
                fields: "title",
            }
        }).on("complete", function (data, response) {
            console.log(data);
            let str = JSON.stringify(data)
            let json = JSON.parse(str)
            let ur = json.records[0].title
            console.log(ur)
            res.send(ur)
        });

})
module.exports = router;