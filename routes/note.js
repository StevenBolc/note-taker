const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');
note
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/note.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/note.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('error');
    });
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/note.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/note.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { username, topic, note } = req.body;

  if (req.body) {
    const newNote = {
      username,
      note,
      topic,
      id: uuidv4(),
    };

    readAndAppend(newnote, './db/notes.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
