import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import HomePage from "./Pages/home-page";
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="logo">
            Muscu App
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
