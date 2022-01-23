import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Newsitem from "./Newsitem";

function Note() {
  const context = useContext(NoteContext);
  const { notes, addNote, getNote, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getNote();
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    console.log("Updating the note.....", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary my-3 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.etitle}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Desciption
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onChange}
                  value={note.edescription}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.etag}
                />
              </div>
            </form>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map(function (note) {
          return (
            <Newsitem
              key={notes._id}
              updateNote={updateNote}
              key={note._id}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Note;
