const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
router
    .route("/")
    .get((req, res) => res.render(path.resolve("./views/register.ejs")))
    .post((req, res) => res.send("POST"));
module.exports = router;