import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../components/materialUI/Notification";

import Workout from "../components/Workout";

import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import "../styles/main-page.scss";

function MainPage() {
    const [data, setData] = useState<any>(null);
    const [userinfo, setUserinfo] = useState(null);
    const [workout, setWorkout] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    useEffect(() => {
        // User data fetching here
        axios
            .get(process.env.REACT_APP_API_URL + "/user", {
                headers: {
                    "auth-token": cookies.user,
                },
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                setUserinfo(res.data.user);
                setWorkout(res.data.user.workout);
                console.log(res.data.user.workout);
                setError(null);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
                setData(null);
                navigate("/login", { state: data });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();
    const toCreateWorkout = () => {
        navigate("/create-workouts", { state: data });
    };

    function Logout() {
        if (cookies.user) {
            removeCookie("user");
        }
        navigate("/login");
    }
    return (
        <div>
            {loading && (
                <div className="loadingContainer">
                    <CircularProgress />
                </div>
            )}
            {error && (
                <div>{`There is a problem fetching user data - ${error}`}</div>
            )}
            {data && (
                <header className="header-main-page-container">
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
                    <Button
                        variant="contained"
                        className="btLogout"
                        onClick={Logout}
                    >
                        <LockIcon className="icon-in-button" />
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
