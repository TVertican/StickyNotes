const stickyNotes = document.getElementById("sticky");
const addNoteButton = document.getElementById("add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  stickyNotes.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", addNote);

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");

  const noteTextArea = document.createElement("textarea");
  noteTextArea.classList.add("note");
  noteTextArea.value = content;
  noteTextArea.placeholder = "Add New Note";

  noteTextArea.addEventListener("change", () => {
    updateNote(id, noteTextArea.value);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", () => {
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");
    if (doDelete) {
      deleteNote(id, noteContainer);
    }
  });

  noteContainer.appendChild(noteTextArea);
  noteContainer.appendChild(deleteButton);

  return noteContainer;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  stickyNotes.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  if(targetNote){
  targetNote.content = newContent;
  saveNotes(notes);
}
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  stickyNotes.removeChild(element);
}
