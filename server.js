const express = require("express");
const app = express();
const fs = require("fs")
const path = require("path")

const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
express.use(express.static("public"))

app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname,".public/notes.html"))
})

app.get("/api/notes", function(request, response) {
    response.sendFile(path.join(__dirname,"./db/db.json"))
})

app.post("/api/notes", function(request, response) {
    const addNote = request.body;
    addNote.id = Date.now();
    const data = fs.readFileSync("./db/db.json");
    const jsonData = JSON.parse(data);
    fs.writeFileSync("./db/db.json", JSON.stringify(jsonData));
    response.send();
});

require("./routes/api.js")(app);
require("./routes/html.js")(app);