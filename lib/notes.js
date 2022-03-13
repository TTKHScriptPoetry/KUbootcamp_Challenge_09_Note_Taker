const fs = require("fs");
const path = require("path");

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

function findById(id, notes) {
   const result = notes.filter((note) => note.id === id)[0];
   return result;
 }
 
function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
  path.join(__dirname, "../db/db.json"),
    // JSON.stringify({ notes }, null, 5)
    JSON.stringify(notes, null, 5) // single array of objects 
  );
  return note;
}
 
module.exports = {
  filterByQuery,
  findById,
  createNewNote
};