// Assigning node package requirements
const path = require('path');

// Exporting the module to be used within server.js
module.exports = function(app) {
    // Getting index.html information
    app.get("/", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/assets/index.html"));
    });

    // Getting notes.html information
    app.get("/notes", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/notes.html"));
    });

}