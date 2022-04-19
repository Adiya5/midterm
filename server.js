const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
app.set('view engine', 'ejs');

app.use("/", require("./routes"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/list", require("./routes/list"));
app.use("/profile", require("./routes/profile"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
