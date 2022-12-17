import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import HomePage from "./Pages/home-page";
import Login from "./Pages/login-page";
import Register from "./Pages/register-page";
import MainPage from "./Pages/main-page";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
