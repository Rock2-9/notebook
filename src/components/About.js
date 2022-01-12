import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, []);
  return (
    <div>
      my name is {a.state.name} and in study class {a.state.class}
    </div>
  );
}
