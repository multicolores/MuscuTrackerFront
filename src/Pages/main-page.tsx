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
import OverallStats from "../components/OverallSatats";

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
                setData(res.data);
                setUserinfo(res.data.user);
                setWorkout(res.data.user.workout);
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

    function reloadDatas() {
        axios
            .get(process.env.REACT_APP_API_URL + "/user", {
                headers: {
                    "auth-token": cookies.user,
                },
            })
            .then((res) => {
                setData(res.data);
                setUserinfo(res.data.user);
                setWorkout(res.data.user.workout);
                // if (res.data.user.workout.length > 0) {
                //   getWorkouts(res.data.user.workout);
                // }
                // console.log(workouts);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
                <div>{`There was a problem while fetching user data - ${error}`}</div>
            )}
            {data && (
                <header className="header-main-page-container">
                    <span className="userName">{data.user.name}</span>
                    <Button
                        variant="contained"
                        className="btCreateTraining gradientButton"
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

                    <div className="stats-container">
                        <div className="overallSatatsComponentContainer">
                            {workout && <OverallStats workouts={workout} />}
                        </div>

                        <div className="overallGraphSatatComponentContainer">
                            <h3>nombre d’entrainement depuis de début</h3>
                            <div></div>
                        </div>

                        <div className="workoutsComponentsContainer">
                            {workout &&
                                workout.map((id: any) => (
                                    <Workout
                                        workout_id={id}
                                        key={id}
                                        user={data.user}
                                        notify={notify}
                                        reloadDatas={reloadDatas}
                                        setNotify={setNotify}
                                    />
                                ))}
                        </div>

                        <div className="otherStatsComponentContainer">
                            <div>
                                <span>1</span>
                            </div>
                            <div>
                                <span>2</span>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}

export default MainPage;
