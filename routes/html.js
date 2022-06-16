const express = require('express');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const router = express.Router();

const pathFind = (name) => path.join("../public", "");

router.get("/notes", (req, res) => {
    res.sendFile(pathFind("notes"));
});

