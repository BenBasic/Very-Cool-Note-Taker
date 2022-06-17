const fs = require("fs");
const path = require("path");

module.exports = function(app) {

    app.get("/notes", function(request, response) {
        response.sendFile(path.join(__dirname,"../public/notes.html"))
        console.log("api get 1 working");
    })
    
    app.get("/api/notes", function(request, response) {
        response.sendFile(path.join(__dirname,"../db/db.json"))
        console.log("api get 2 working");
    })
    
    app.post("/api/notes", function(request, response) {
        const addNote = request.body;
        console.log("addNote is: " + addNote);
        addNote.id = Date.now();
        console.log("note id is: " + addNote.id);
        const data = fs.readFileSync("./db/db.json", "utf8");
        console.log("data is: " + data);
        const jsonData = JSON.parse(data);
        console.log("jsonData is: " + jsonData);
        jsonData.push(addNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(jsonData));
        response.send();
        console.log("api post 1 working");
    });
    
    app.delete("/api/notes/:id", function(request, response) {
        const noteId = Number(request.params.id);
        const data = fs.readFileSync("./db/db.json", "utf8");
        const jsonData = JSON.parse(data);
        const newNoteJSON = jsonData.filter(function(thisNote) {
            console.log("api delete 1 working");
            return thisNote.id !== noteId;
            
        });
    
        fs.writeFileSync("./db/db.json", JSON.stringify(newNoteJSON));
        console.log("writeFileSync working");
        response.send();
    });
};