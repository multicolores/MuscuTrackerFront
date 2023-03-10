import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Notification from "../components/materialUI/Notification";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../styles/login_register.scss";
import Waves from "../components/Waves";

function Login() {
    const [email, setEmail] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [userdata, setuserdata] = useState(null);
    const [cookies, setCookie] = useCookies(["user"]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });

    let navigate = useNavigate();

    function setACookie(token: any) {
        setCookie("user", token, {
            path: "/",
            maxAge: 604800,
        });
    }

    function RegisterPostRequest() {
        axios
            .post(process.env.REACT_APP_API_URL + `/login`, {
                email: email,
                password: password,
            })
            .then((res) => {
                setACookie(res.data);
                navigate("/main");
            })
            .catch((error) => {
                console.error(error);
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
                        message:
                            "Erreur, merci de remplire tous les champs correctement",
                        type: "error",
                    });
                }
            });
    }

    return (
        <div>
            <div className="contactPage_Container">
                <Waves />
                <div className="registerContainer">
                    <h1>Login</h1>
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
                        <Link to="/register">
                            <Button
                                variant="outlined"
                                className="registerButton"
                            >
                                Register
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            onClick={RegisterPostRequest}
                            className="multiRoundedButton"
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}

export default Login;
