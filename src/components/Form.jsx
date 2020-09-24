import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Zoom } from '@material-ui/core';

function Form(props) {
  const [note, setNote] = React.useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  }

  function submitNote(event) {
    if (note.title || note.content) {
      props.onClick(note)
      setNote({ title: "", content: "" })
    }
    event.preventDefault();
  }

  return (
    <div>
      <form className='create-note'>
        {isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />}

        <textarea onChange={handleChange} onClick={() => setExpanded(true)} name="content" placeholder="Take a note..." rows={isExpanded ? "3" : "1"} value={note.content} />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Form;
