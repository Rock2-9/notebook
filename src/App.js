import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Note from "./components/Note";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="container">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="Login" element={<Login />} />
            <Route path="SignUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
