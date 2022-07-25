const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json")


var app = express();
const PORT = 3001;                               


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);
// Get route for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.json(db);

    // Log our request to the terminal
    console.info('request received');
});

// POST request to add a review
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info('request received');

    app.route('/api/notes')
        .get(function (req, res) {
            res.json(db);
        })
        .post(function (req, res) {
            let jsonFilePath = path.join(__dirname, "/db/db.json");
            fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

                if (err) {
                    return console.log(err);
                }
                console.log("Your note was saved!");

            });

        });


    app.delete("/api/notes/:id", function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        // request to delete note by id.
        for (let i = 0; i < database.length; i++) {

            if (database[i].id == req.params.id) {
                // Splice takes i position, and then deletes the 1 note.
                database.splice(i, 1);
                break;
            }
        }
        // Write the db.json file again.
        fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            } else {
                console.log("Your note was deleted!");
            }
        });
        res.json(database);
    });


    
});
app.listen(PORT, () =>
        console.log(`App listening at http://localhost:${PORT} 🚀`)
    );