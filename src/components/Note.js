import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Newsitem from "./Newsitem";

function Note() {
  const context = useContext(NoteContext);
  const { notes, addNote, getNote } = context;
  useEffect(() => {
    getNote();
  });

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map(function (note) {
          return <Newsitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Note;
