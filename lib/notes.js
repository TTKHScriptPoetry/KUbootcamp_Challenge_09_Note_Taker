const fs = require("fs");
const path = require("path");

// just in case
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

function scanNotes(notes, idExisted){
  if(idExisted){
    for(var i = 0 ; i < notes.length; i++){
      notes[i].id = "";
      notes[i].id = (i + 1) + "n";
    }
  }
  // if(idExisted){
  //   for(var i = 0 ; i < notes.length; i++){
  //     if(!notes[i].id){
  //       notes[i].id = "";
  //       notes[i].id = (i + 1) + "n";
  //     }
  //   }
  // }
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),     
      JSON.stringify(notes, null, 5) // JSON.stringify({ notes }, null, 5)
    );
  return notes
}

function filterById(id, notes) {
  var result = notes.filter((note) => note.id != id);
  // result = scanNotes(result, true); // re-id

  jsonresult =  JSON.stringify(result, null, 5)

  console.log('ssssssssssssssssssssssssss');
  console.log(jsonresult)

  // fs.writeFile('db/db.json', jsonresult, err => 
  //  {
  //   if (err) throw new Error(err);
  //   console.log('db/db.json updated!');
  // });
 
  fs.writeFileSync(
    path.join(__dirname, "../db/dbpm.json"),     
      JSON.stringify(result, null, 7) // JSON.stringify({ notes }, null, 5)
    );
  return result;
 }
 
// In use
function createNewNote(body, notes) {
  const note = body;
  notes.push(note);

  notes = scanNotes(notes, true); // re-id
  
  console.log('ridridridridridridridridrid');
  console.log(notes);
 
  fs.writeFileSync(
  path.join(__dirname, "../db/db.json"),
    // single array of objects
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