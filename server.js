// Author: Joey Thao
// Collaborators: Jason Yang, Sichoun Lee
// Date: 11/20/2023
// Description: generating a note-taking system through express and fs.

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const infoNotes = require("./db/db.json");
// Below: the dependency always have the same name. path be the same as ("path")
const path = require("path");
const fs = require ("fs");
const uuid = require("./helpers/uuid");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Below: express function is being used below. Get is reading and retrieving data. "Notes" is the location. URL have to be very specific. 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Below: "/" means the default page. 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
} )

// Below: display the data. infoNotes is ("./db/db.json")
app.get("/api/notes", (req, res)=> res.json(infoNotes));

// Below: create a note and put it in the JSON file.
app.post("/api/notes", (req, res) => {


// Below: read the file and go through the err and data. 
fs.readFile("db/db.json", "utf8", (err, info)=> {
    const note1 = JSON.parse(info);
    // Below: creating an object with the title and req body text and also the id. 
    const newNote1 = {"title": `${req.body.title}`, "text": `${req.body.text}`, "id": uuid()};
    // Below: adding the newNote1 object into the array of json objects. 
    note1.push(newNote1);
    // Below: getting the notes that were turn into json and turn it back into strings. 
    note1json = JSON.stringify(note1);
    fs.writeFile("./db/db.json", note1json, (error) => {
        if (error) return res.status().json({ status: "err"})
        res.status(200).json({status: "sucess"})
    })

})
});

// Below: to make sure the server is running. 
app.listen(PORT, () => {
    console.log(`Serving working at http://localhost:${PORT}`);
});