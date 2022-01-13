import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      title: "Just checking....",
      description: "checking everything working fine in my router",
      tag: "General",
      date: {
        $date: "2022-01-05T08:15:35.653Z",
      },
      __v: 0,
    },
    {
      title: "Just checking....second time.........",
      description: "checking everything working fine in my router",
      tag: "General",
      date: {
        $date: "2022-01-05T08:15:35.653Z",
      },
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
