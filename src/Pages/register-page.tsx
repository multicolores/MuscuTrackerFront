import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/materialUI/Notification";
import ReCAPTCHA from "react-google-recaptcha";

import "../styles/login_register.scss";
import Waves from "../components/Waves";

function Register() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const [name, setName] = useState<String | null>(null);
    const [email, setEmail] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    let navigate = useNavigate();

    function RegisterPostRequest() {
        //* attention il faut avoir le bon nombre de lettre ect...
        var jsonRegisterInfo = {
            name: name,
            email: email,
            password: password,
        };
        if (captchaRef.current && captchaRef.current.getValue()) {
            axios
                .post(process.env.REACT_APP_API_URL + `/register`, {
                    name: name,
                    email: email,
                    password: password,
                })
                .then((res) => {
                    navigate("/login");
                })
                .catch((error) => {
                    if (error.response) {
                        setNotify({
                            isOpen: true,
                            message: "Error" + " : " + error.response.data,
                            type: "error",
                        });
                    } else if (error.request) {
                        setNotify({
                            isOpen: true,
                            message:
                                "Erreur, merci de remplire tous les champs correctement",
                            type: "error",
                        });
                    } else {
                        console.log("Error", error.message);
                        setNotify({
                            isOpen: true,
                            message: "Error" + " : " + error.message,
                            type: "error",
                        });
                    }
                });
        } else {
            setNotify({
                isOpen: true,
                message: "Merci de montrer que vous n'etes pas un robot.",
                type: "error",
            });
        }
    }

    return (
        <div>
            <div className="contactPage_Container">
                <Waves />
                <div className="registerContainer">
                    <h1>Registration</h1>
                    <TextField
                        label="Name"
                        variant="standard"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="standard"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div className="button_container">
                        <Link to="/login">
                            <Button
                                variant="outlined"
                                className="registerButton"
                            >
                                Login
                            </Button>
                        </Link>

                        <Button
                            variant="contained"
                            onClick={RegisterPostRequest}
                            className="multiRoundedButton"
                        >
                            Register
                        </Button>
                    </div>
                </div>
                <div className="reCaptchaContainer">
                    <ReCAPTCHA
                        sitekey="6LcmRc0jAAAAAIdmDUqh_y8G5-N3BJKZoZnp-nmn"
                        ref={captchaRef}
                    />
                </div>
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}

export default Register;
