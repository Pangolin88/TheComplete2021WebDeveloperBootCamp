import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Note title",
      content: "Note content"
    }
  ])

  const addNewNote = (newNote) => {
    setNotes(preNotes => [...preNotes, newNote])
  }

  const deleteNote = (id) => {
    console.log(id)
    setNotes(preNotes => preNotes.filter((note, key) => key !== id))
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNewNote}/>
      {notes.map((note, id) => 
        <Note id={id} title={note.title} content={note.content} onDelete={deleteNote}/>
      )}
      <Footer />
    </div>
  );
}

export default App;
