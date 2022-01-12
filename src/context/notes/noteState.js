import NoteContext from "./noteContext";
import { useState } from "react";

const noteState = (props) => {
  const state = {
    name: "Harry",
    class: "5b",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "Deepak",
        class: "4a",
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};
