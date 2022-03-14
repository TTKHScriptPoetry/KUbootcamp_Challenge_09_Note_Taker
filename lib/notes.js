const fs = require("fs");
const path = require("path");

// just in case if client does query strings at url
function filterByQuery(query, notes) {
  let filteredResults = notes;
  if (query.text) {
    filteredResults = filteredResults.filter(
      (note) => note.text === query.text
    );
  }
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  return filteredResults;
}

// Goes thru collection to ensure the note ids are consistent
function scanNotes(notes, idExisted){
  if(idExisted){
    for(var i = 0 ; i < notes.length; i++){
      notes[i].id = "";
      notes[i].id = (i + 1) + "n";
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),     
      JSON.stringify(notes, null, 5) // JSON.stringify({ notes }, null, 5)
    );
  return notes
}

// Return only notes of which id is not subject for deletion
function filterById(id, notes) {
  var result = notes.filter((note) => note.id != id);
  return result;
 }
 
// Appends new note to existing collection and write up-to-date file data
function createNewNote(body, notes) {
  const note = body;
  notes.push(note);

  notes = scanNotes(notes, true); // re-id
  
  // console.log('ridridridridridridridridrid');
  // console.log(notes);
 
  fs.writeFileSync(
  path.join(__dirname, "../db/db.json"),
    // 5 spaces of indentation
    JSON.stringify(notes, null, 5) // JSON.stringify({ notes }, null, 5)
  );
  return note;
}
 
module.exports = {
  filterByQuery,
  filterById,
  createNewNote,
  scanNotes
};