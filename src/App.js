import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Note from "./components/Note";
import Alert from "./components/Alert";

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message="Note has been fetched second times" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
        <Note />
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
