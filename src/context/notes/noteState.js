import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //Get notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOGZjN2RiZjM1NTJiNjM3MjZiZGRmIn0sImlhdCI6MTY0MjY1ODk0MX0.bamlKMKxox09Cs5MZZ9bEOtNSPHUw20QEPtD1tJDLLI",
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //Add notes

  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOGZjN2RiZjM1NTJiNjM3MjZiZGRmIn0sImlhdCI6MTY0MjY1ODk0MX0.bamlKMKxox09Cs5MZZ9bEOtNSPHUw20QEPtD1tJDLLI",
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();

    const note = json;
    setNotes(notes.concat(note));
  };
  //Delete notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOGZjN2RiZjM1NTJiNjM3MjZiZGRmIn0sImlhdCI6MTY0MjY1ODk0MX0.bamlKMKxox09Cs5MZZ9bEOtNSPHUw20QEPtD1tJDLLI",
      },
    });

    console.log("Deleting Note with their id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOGZjN2RiZjM1NTJiNjM3MjZiZGRmIn0sImlhdCI6MTY0MjY1ODk0MX0.bamlKMKxox09Cs5MZZ9bEOtNSPHUw20QEPtD1tJDLLI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit in Client
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
