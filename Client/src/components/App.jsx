import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Form from "./Form";

function App() {
  const [notes, setNotes] = React.useState([]);

  function addNote(note) {
    setNotes([...notes, note]);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note, i) => i !== id))
  }


  return (
    <div>
      <Header />
      <Form
        onClick={addNote}
      />
      {
        notes.map((note, i) => {
          return (
            <Note
              key={i}
              id={i}
              title={note.title}
              content={note.content}
              onClick={deleteNote}
            />
          )
        })
      }
      <Footer />
    </div>
  );
}

export default App;
