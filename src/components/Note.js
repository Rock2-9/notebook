import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import Newsitem from "./Newsitem";

function Note() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;

  return (
    <div className="container mx-3">
      <h2>Your Notes</h2>
      {notes.map(function (note) {
        return <Newsitem note={note} />;
      })}
    </div>
  );
}

export default Note;
