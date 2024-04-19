const express = require("express")
const cors = require("cors")
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./db")
const app = express()
const port = 3001

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world!")
})

// res.body : Course{id: number, code: string}
app.get("/courseList", (req, res) => {
    db.all("SELECT id, code FROM Courses", (err, rows) => {
        res.send(rows)
    })
})

const reviews = [
    {id: 1,courseId: 1, rating: 3, message: "An okay course"},
    {id: 2,courseId: 1, rating: 5, message: "The lectures by Professor A were very interesting"},
    {id: 3,courseId: 2, rating: 1, message: "I got a D grade, too hard"},
    {id: 4,courseId: 2, rating: 3, message: "I got an A, the lectures didn't help too much"},
    {id: 5,courseId: 3, rating: 4, message: "Cons: there was a group assignment, Pros: the students generally work hard :)"}
]

// req.query.courseId : number
// res.body : Review{id: number, rating: number, message: string}
app.get("/reviews", (req, res) => {
    db.all(`
        SELECT id, rating, message FROM Reviews
        WHERE courseId = ?
    `, [req.query.courseId], (err, rows) => {
        res.send(rows)
    })
})

// req.body = Review{courseId: number, rating: number, message: string}
app.post("/reviews", (req, res) => {
    db.run(`
        INSERT INTO Reviews (courseId, rating, message) VALUES ($courseId, $rating, $message)
    `, {
        $courseId: req.body.courseId,
        $rating: req.body.rating,
        $message: req.body.message
    }, function(err) {
        if (!err) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    })
})

app.listen(port, () => {
    console.log(`Course Commenting Web App BackEnd listening on port ${port}`)
})

process.on('SIGINT', () => {
    db.close((err) => {
        // Ignore error for now..
        console.log("Server closed. Database closed.")
        process.exit()
    })
})