// Assigning node package requirements
const express = require("express");
const app = express();

// Assigning the port to either be the process environment port, or a port 3001 for local host
const PORT = process.env.PORT || 3001;

// Initializing the express
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static("public"));

// Setting up the requirements for using the exported function within api.js and html.js
require("./routes/api.js")(app);
require("./routes/html.js")(app);

// Assigning the express to listen for the port and console logging it to the terminal
app.listen(PORT, function() {
    console.log("Listening to port: " + PORT);
});