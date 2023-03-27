import * as React from "react";
import "../styles/home-page.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import phone_mockup_image from "../images/phone-mockup-graph.png";
import phone_mockup_image2 from "../images/phone-mockup2.png";
import phone_mockup_image3 from "../images/phone-mockup3.png";
import phone_mockup_3d_image from "../images/phone-mockup-graph-3D-circle.png";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function HomePage() {
    return (
        <div className="homePage_container">
            <header>
                <div className="header-background"></div>
                <div className="text-header-container">
                    <h1>
                        Votre application pour suivre vos entrainements de
                        musculation.
                    </h1>
                    <div className="buttonsContainer">
                        <Link to="/register">
                            <Button
                                variant="contained"
                                className="gradient-btn"
                            >
                                <PersonIcon className="icon-in-button" />
                                Register
                            </Button>
                        </Link>
                        <Link to="/main">
                            <Button
                                variant="contained"
                                className="multiRoundedButton"
                            >
                                <LockOpenIcon className="icon-in-button" />
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="image-header-container">
                    <img
                        src={phone_mockup_image3}
                        alt="home phone mockup of the app 1"
                        className="main-image"
                    />

                    <img
                        src={phone_mockup_image2}
                        alt="home phone mockup of the app 2"
                    />
                    <img
                        src={phone_mockup_image}
                        alt="home phone mockup of the app 3"
                    />
                </div>
            </header>

            <section className="home-page-app-description-section">
                <div className="contered-image-container">
                    <img
                        src={phone_mockup_3d_image}
                        alt="home desktop mockup of the app"
                    />
                </div>
                <div className="text-container">
                    <h1>C’est quoi MuscuTracker</h1>
                    <div>
                        <h2>Simplicité et disponibilité</h2>
                        <p>
                            MuscuTracker permet a un utilisateur d'enregistrer
                            et de suivre ses performances d'entraînement
                            facilement et à tout instant grâce a son téléphone.
                        </p>
                    </div>
                    <div>
                        <h2>Suivi de la performance</h2>
                        <p>
                            Renseigner ses performances est intuitif et rapide,
                            rien ne nous déconcentre lorsque l’on est en pleine
                            séance.
                            <br />
                            Le suivi des progrès se fait grâce à plusieurs
                            graphiques représentant les séances effectué avec
                            plusieurs indicateurs de performances différents.
                        </p>
                    </div>
                    <div>
                        <h2>Progresser efficacement</h2>
                        <p>
                            La visualisation de sa progression est facile et
                            permet d’avoir une visualisation simple pour
                            comprendre si notre entraînement est productif ou
                            non.
                        </p>
                    </div>
                </div>
            </section>

            <section className="home-page-app-call-to-a-action-section">
                <div className="text-container">
                    <h2>Commencer à utiliser</h2>
                    <h2>MuscuTracker</h2>
                </div>
                <div className="buttonsContainer">
                    <Link to="/register">
                        <Button variant="contained" className="gradient-btn">
                            <PersonIcon className="icon-in-button" />
                            Register
                        </Button>
                    </Link>
                    <Link to="/main">
                        <Button
                            variant="contained"
                            className="multiRoundedButton"
                        >
                            <LockOpenIcon className="icon-in-button" />
                            Login
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
