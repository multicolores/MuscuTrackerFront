import * as React from "react";
import "../styles/home-page.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import home_image from "../images/homepage-image.jpg";

function HomePage() {
  return (
    <div className="homePage_container">
      <img
        src={home_image}
        alt="home image logo musculation"
        className="background_image_container"
      />
      <header>
        <h1>Votre application de musculation pour suivre vos entrainements.</h1>
        <Link to="/register">
          <Button variant="contained" className="borderButton">
            Register
          </Button>
        </Link>
        <Link to="/main">
          <Button variant="contained" className="borderButton">
            Login
          </Button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
