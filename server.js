const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static("public"));


require("./routes/api.js")(app);
require("./routes/html.js")(app);

app.listen(PORT, function() {
    console.log("Listening to port: " + PORT);
});