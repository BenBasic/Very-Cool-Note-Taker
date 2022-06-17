// Assigning node package requirements
const fs = require("fs");
const path = require("path");

// Exporting the module to be used within server.js
module.exports = function(app) {

    // Getting notes.html information
    app.get("/notes", function(request, response) {
        response.sendFile(path.join(__dirname,"../public/notes.html"))
        console.log("api get 1 working");
    })
    
    // Getting db.json information
    app.get("/api/notes", function(request, response) {
        response.sendFile(path.join(__dirname,"../db/db.json"))
        console.log("api get 2 working");
    })
    
    // Posting the information the user typed in the note
    app.post("/api/notes", function(request, response) {
        // Assigning addNote to the JavaScript object containing the parse JSON (body)
        const addNote = request.body;
        console.log("addNote is: " + addNote);
        // Assigning the addNote.id to the current milliseconds date, this way the id is always new and wont be the same as previous note id's because the Date.now is always increasing as time progresses
        addNote.id = Date.now();
        console.log("note id is: " + addNote.id);
        // Assigning data to the readFileSync of db.json, utf8 is also included as it makes the file readable
        const data = fs.readFileSync("./db/db.json", "utf8");
        console.log("data is: " + data);
        // Assigning jsonData to parse data which is assigned as db.json
        const jsonData = JSON.parse(data);
        console.log("jsonData is: " + jsonData);
        // Pushes jsonData to addNote which is assigned to JSON body
        jsonData.push(addNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(jsonData));
        // Sends the HTTP response
        response.send();
        console.log("api post 1 working");
    });
    
    // Deleting the data of one of the users saved notes
    app.delete("/api/notes/:id", function(request, response) {
        // Assigning noteId to be a Number which will have the id parameters of the note attempting to be deleted
        const noteId = Number(request.params.id);
        // Assigning data to the readFileSync of db.json, utf8 is also included as it makes the file readable
        const data = fs.readFileSync("./db/db.json", "utf8");
        // Assigning jsonData to parse data which is assigned as db.json
        const jsonData = JSON.parse(data);
        // Assigning newNoteJSON to filter the parsed db.json 
        const newNoteJSON = jsonData.filter(function(thisNote) {
            console.log("api delete 1 working");
            // Returns a value of false so that the note can be deleted
            return thisNote.id !== noteId;
            
        });
    
        // Writes to the db.json so that it registers the deleted note
        fs.writeFileSync("./db/db.json", JSON.stringify(newNoteJSON));
        console.log("writeFileSync working");
        // Sends the HTTP response
        response.send();
    });
};