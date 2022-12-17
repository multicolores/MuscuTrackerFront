import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../components/materialUI/Notification";

import Workout from "../components/Workout";

import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
  const [data, setData] = useState<any>(null);
  const [userinfo, setUserinfo] = useState(null);
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const [workouts, setWorkouts] = useState([]);
  // const [errorWorkout, setErrorWorkout] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // User data fetching here
    // maybe see if there is user cookie or redirection to login
    let userData = {
      user: {
        _id: "62271f84379a40512d62e9e4",
        name: "Florian",
        email: "test@gmail.com",
        password:
          "$2a$10$w9lfmlpdMtqendmPQNujfeb5WSMYqMtjP2G./ZE9RcPNu5KLrE..W",
        createdAt: "2022-03-08T09:19:00.497Z",
        updatedAt: "2022-09-22T17:29:53.740Z",
        __v: 0,
        workout: ["632c9b91e3a845ce70f64214"],
      },
      token: { _id: "62271f84379a40512d62e9e4", iat: 1667484106 },
    };
    setData(userData);
    setWorkout(userData.user.workout);
    setLoading(false);

    console.log(userData);
  }, []);

  const navigate = useNavigate();
  const toCreateWorkout = () => {
    navigate("/create-workouts", { state: data });
  };

  function Logout() {
    // if (cookies.user) {
    //   removeCookie("user");
    // }
    navigate("/login");
  }
  return (
    <div>
      {loading && (
        <div className="loadingContainer">
          <CircularProgress />
        </div>
      )}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {data && (
        <header className="headerMain-pageContainer">
          <h1>{data.user.name}</h1>
          <Button
            variant="contained"
            className="btAddTraining gradientButton"
            onClick={() => {
              toCreateWorkout();
            }}
          >
            Create a Workout
          </Button>
          <Button variant="contained" className="btLogout" onClick={Logout}>
            Logout
          </Button>

          <div className="workoutsComponentsContainer">
            {workout &&
              workout.map((id: any) => (
                <Workout
                  workout_id={id}
                  key={id}
                  user={data.user}
                  notify={notify}
                  setNotify={setNotify}
                />
              ))}
          </div>
        </header>
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default MainPage;
