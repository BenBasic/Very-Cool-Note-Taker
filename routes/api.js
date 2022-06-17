const fs = require("fs");
const path = require("path");

app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get("/api/notes", function(request, response) {
    response.sendFile(path.join(__dirname,"./db/db.json"))
})

app.post("/api/notes", function(request, response) {
    const addNote = request.body;
    addNote.id = Date.now();
    const data = fs.readFileSync("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    fs.writeFileSync("./db/db.json", JSON.stringify(jsonData));
    response.send();
});