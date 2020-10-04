import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Form from "./Form";
import axios from 'axios';

const qs = require('qs');

const url = 'http://localhost:9000';
const options = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}

function App() {
  const [notes, setNotes] = React.useState([]);
  fetchNotes();

  async function addNote(note) {
    const { data: notes } = await axios.post(url + '/notes/addnote', qs.stringify(note), options);
    setNotes(notes);
  }

  async function deleteNote(id) {
    const { data: notes } = await axios.post(url + '/notes/removenote', qs.stringify({ id }), options);
    setNotes(notes)
  }

  async function fetchNotes() {
    const { data: notes } = await axios.get(url + '/notes');
    setNotes(notes);
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
              id={note._id}
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
