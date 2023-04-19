const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const uuid = require("uuid") //generates unique ids

const PORT = 3001

const app = express()

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

//API route to read db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {
    res.json(`${req.method} request received to get notes`)

    console.info(`${req.method} request received to get notes`)

    //more code here?
})

//API route to receive new note to save on request body, add it to db.json. and return new note to client
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`)

    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            review_id: uuid(),
        }


        const noteString = JSON.stringify(newNote)

        writeFile("./db/db.json", noteString, (err) =>
            err ? console.error(err) : console.log("Note has been written to JSON file🤓")
        )

        const response = {
            status: "success",
            body: newNote,
        }

        console.log(response)
        res.status(201).json(response)
    } else {
        res.status(500).json("Error writing note")
    }

})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
)