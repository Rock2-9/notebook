import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function Newsitem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <div className="card col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fas fa-edit mx-2"></i>
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Newsitem;
