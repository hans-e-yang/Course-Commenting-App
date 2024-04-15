const express = require("express")
const cors = require("cors")
const app = express()
const port = 3001

app.use(cors({
    origin: "http://localhost:3000"
}))

// app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/courseList", (req, res) => {
    res.send([{name: "CS101"}, {name: "MA101"}, {name: "PHY101"}])
})

app.listen(port, () => {
    console.log(`Course Commenting Web App BackEnd listening on port ${port}`)
})
