import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/materialUI/Notification";

import "../styles/login_register.scss";

function Register() {
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
    console.log(jsonRegisterInfo);

    axios
      .post(`http://localhost:8080/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          setNotify({
            isOpen: true,
            message: "Error" + " : " + error.response.data,
            type: "error",
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }
  return (
    <div>
      <div className="contactPage_Container">
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
              <Button variant="outlined" className="registerButton">
                Login
              </Button>
            </Link>

            <Button
              variant="contained"
              onClick={RegisterPostRequest}
              className="loginButton"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Register;
