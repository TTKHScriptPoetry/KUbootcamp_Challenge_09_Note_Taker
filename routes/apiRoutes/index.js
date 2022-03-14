const express = require('express');
const router = express.Router();

// import customized libraries
const { filterByQuery, filterById, createNewNote, scanNotes } = require('../../lib/notes');
// const { notes } = require('../../db/notes'); // json data file  // an object having 1 array of note-objects 
var notes  = require('../../db/db'); // json data format  // an array of note objects

// Method GET
router.get("/notes", (req, res) => {  
  let results = scanNotes(notes, idExisted = true); // notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  // console.log('gggggggggggggggggggggggggg');
  // console.log(results);
  res.json(results);
 });

// Method DELETE
router.delete("/notes/:id", (req, res) => {  
  const { id } = req.params;
  const deleted = notes.find(note => note.id === id);
  // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmm');
  // console.log (deleted);
  if(deleted){
    let undeleted = filterById(req.params.id, notes); // undeleted notes
    // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuu');
    // console.log (undeleted);
    notes = scanNotes(undeleted, idExisted = true);
    // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    // console.log (notes);
    res.json(notes);
  }
  else {
    res.json({message: "It appears the note with given ID does not exist"})
  }
});

// Method POST
router.post("/notes", (req, res) => {  
  // console.log("Begin to save new message via post method");
  console.log(req.body);
  const note = createNewNote(req.body, notes);
  res.json(note);
   
});

module.exports = router;