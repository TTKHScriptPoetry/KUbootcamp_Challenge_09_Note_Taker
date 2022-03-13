const express = require('express');
const router = express.Router();

// import customized libraries
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
// const { notes } = require('../../db/notes'); // json data file  // an object having 1 array of note-objects 
const notes  = require('../../db/db'); // json data file  // an array of note objects

router.get("/notes", (req, res) => {  
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
 });

// Just in case
router.get("/notes/:id", (req, res) => {  
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {  
  // // req.body.id = notes.length.toString(); // will be back
  const note = createNewNote(req.body, notes);
  res.json(note);
   
});

module.exports = router;