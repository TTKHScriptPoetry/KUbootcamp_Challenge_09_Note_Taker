let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
const STRING_EMPTY = '';

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// (1)  
// Called by getAndRenderNotes() 
const getNotes = () =>
  // alert("getNote is called!");
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Called by handleNoteSave() as is
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);
  if((activeNote.title)) // if(!(typeof activeNote.title === 'undefined'))
  {
    // alert("activeNote is not falsy");
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.setAttribute('placeholder', STRING_EMPTY);
    noteText.setAttribute('placeholder', STRING_EMPTY);

    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;

    if (activeNote.id) {
      // alert("Your are in renderActiveNote() method where Note id? " + activeNote.id);
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    }     
  }
  else 
  {
    // alert("activeNote is falsy");
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.setAttribute('placeholder', 'Note Title');
    noteText.setAttribute('placeholder', 'Note Text');    
    noteTitle.value = STRING_EMPTY;
    noteText.value = STRING_EMPTY;
    noteTitle.focus();
  }
};

// Triggered when the floppy disk button aka saveNoteBtn gets clicked
const handleNoteSave = () => {
  // alert("You are entering Saving Notes Zone! having " + noteTitle.value );
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => { // a POST per saveNote
    getAndRenderNotes(); // getNotes().then(renderNoteList); // a GET per getNotes()
    renderActiveNote();
  });
};

const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target; // delete icon of the to-be-deleted note
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  // alert("data-note: " + activeNote.title + " " +  activeNote.text);
  console.log(activeNote);
  renderActiveNote();
};

// Triggered when the + sign is clicked
// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  e.preventDefault();
  activeNote = {}; // this makes activeNote.title, activeNote.text both undefined that triggers empty field rendering
  // console.log('++++++++++t+++++++++++');
  //   console.log(activeNote.title); // prints undefined
  //   console.log(activeNote.text); // prints undefined
  // console.log('+++++++++++b++++++++++');
  renderActiveNote();
};

// Self explanatory
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// (2) 
// Happens inside the clause Promise as a result of getNotes()
// Renders the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = '')); // clear ul content
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));

    noteTitle.setAttribute('readonly', true); // clear fields if previously viewing a note
    noteText.setAttribute('readonly', true);
    noteTitle.setAttribute('placeholder', STRING_EMPTY);
    noteText.setAttribute('placeholder', STRING_EMPTY);

  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note); // converted to data-note

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}
 
getAndRenderNotes();
