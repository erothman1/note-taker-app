const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const uuid = require("uuid") //generates unique ids

const PORT = 3001

const app = express()

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))

//HTML route to return notes.html
app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
)

//HTML route to return to index.html
//wildcard path
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
)