import React from "react";

function Newsitem(props) {
  const { note } = props;
  return (
    <div className="card col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i class="fas fa-edit mx-2"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default Newsitem;
