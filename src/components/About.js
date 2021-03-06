import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

export default function About() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;

  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      {notes.map(function (note) {
        return note.title;
      })}
    </div>
  );
}
