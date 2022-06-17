const fs = require("fs");
const path = require("path");

module.exports = function(app) {

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
    
    app.delete("/api/notes/:id", function(request, response) {
        const noteId = Number(request.params.id);
        const data = fs.readFileSync("./db/db.json", "utf8");
        const jsonData = JSON.parse(data);
        const newNoteJSON = jsonData.filter(function(thisNote) {
            return thisNote.id !== noteId;
        });
    
        fs.writeFileSync("./db/db.json", JSON.stringify(newNoteJSON));
        response.send();
    });
};