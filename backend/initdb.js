const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./db')

// Initialize tables
db.serialize(() => {
    db.run(`DROP TABLE Reviews; DROP TABLE Courses;`,
        (res, err) => console.log(res, err))
    db.run(`CREATE TABLE IF NOT EXISTS Courses (
        id          INTEGER     PRIMARY KEY,
        code        TEXT        UNIQUE NOT NULL
    )`, (res, err) => console.log(res, err))
    db.run(`CREATE TABLE IF NOT EXISTS Reviews (
        id          INTEGER     PRIMARY KEY,
        courseId    INTEGER     NOT NULL,
        rating      INTEGER     NOT NULL,
        message     TEXT        NOT NULL,
        CHECK (rating >= 1 AND rating <= 5),
        FOREIGN KEY (courseId) REFERENCES Courses (id) ON DELETE CASCADE
    )`, (res, err) => console.log(res, err))
    db.run(`INSERT OR IGNORE INTO Courses (code) VALUES 
        ('CS101'), 
        ('MA101'),
        ('PHY101')
    `, (res, err) => console.log(res, err))
})

db.close()