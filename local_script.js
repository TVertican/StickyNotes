function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
  }
  
  function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
  }
  
