import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../components/materialUI/Notification";

import Workout from "../components/Workout";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import "../styles/main-page.scss";
import OverallStats from "../components/OverallSatats";
import OverallGraphStat from "../components/OverallGraphStat";
import PoidsGraphStat from "../components/PoidsGraphStat";
import RecupGraphStat from "../components/RecupGraphStat";

function MainPage() {
    const [data, setData] = useState<any>(null);
    const [userinfo, setUserinfo] = useState(null);
    const [workout, setWorkout] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [allWorkoutsDatas, setAllWorkoutsDatas] = useState<any>([]);
    const [allWorkoutsLoading, setAllWorkoutsLoading] = useState(true);
    const [allWorkoutsError, setAllWorkoutsError] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
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
                fetchAllWorkoutsData(res.data.user.workout);
                setError(null);
            })
            .catch((err) => {
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

                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });

        fetchAllWorkoutsData(data.user.workout);
    }

    function Logout() {
        if (cookies.user) {
            removeCookie("user");
        }
        navigate("/login");
    }

    const fetchAllWorkoutsData = (workoutsIds: string[]) => {
        setAllWorkoutsDatas([]);
        workoutsIds.map((workoutId) => {
            axios
                .get(process.env.REACT_APP_API_URL + "/workout/" + workoutId, {
                    headers: {
                        "auth-token": cookies.user,
                    },
                })
                .then((res) => {
                    setAllWorkoutsDatas((oldData: any) => [
                        ...oldData,
                        res.data,
                    ]);
                    setAllWorkoutsError(null);
                })
                .catch((err) => {
                    setAllWorkoutsError(err.message);
                    setAllWorkoutsDatas(null);
                })
                .finally(() => {
                    setAllWorkoutsLoading(false);
                });
        });
    };
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
                    {/* <span className="userName">{data.user.name}</span> */}
                    <Button
                        variant="contained"
                        className="btCreateTraining blueButton"
                        onClick={() => {
                            toCreateWorkout();
                        }}
                    >
                        Créer un entrainement
                    </Button>
                    <Button
                        variant="contained"
                        className="btLogout"
                        onClick={Logout}
                    >
                        <LockIcon />
                    </Button>

                    {workout.length > 0 && (
                        <div className="stats-container">
                            {/* todo: regroupper toussa dans le même componsant ? a voir ( faire attentions au grid aussi ) */}
                            <div className="overallSatatsComponentContainer">
                                {allWorkoutsLoading && (
                                    <div className="loadingContainer">
                                        <CircularProgress />
                                    </div>
                                )}
                                {allWorkoutsError && (
                                    <div>{`There was a problem while fetching user data - ${error}`}</div>
                                )}

                                {allWorkoutsDatas.length >=
                                    data.user.workout.length && (
                                    <OverallStats workouts={allWorkoutsDatas} />
                                )}
                            </div>

                            <div className="workoutsComponentsContainer">
                                {/* <KeyboardDoubleArrowDownIcon className="scroll-down-icon" /> */}
                                {workout &&
                                    workout.map((id: any) => (
                                        <Workout
                                            workout_id={id}
                                            user={data.user}
                                            notify={notify}
                                            reloadDatas={reloadDatas}
                                            setNotify={setNotify}
                                            key={id}
                                        />
                                    ))}
                            </div>

                            <div className="overallGraphSatatComponentContainer">
                                {allWorkoutsLoading && (
                                    <div className="loadingContainer">
                                        <CircularProgress />
                                    </div>
                                )}
                                {allWorkoutsError && (
                                    <div>{`There was a problem while fetching user data - ${error}`}</div>
                                )}

                                {allWorkoutsDatas.length >=
                                    data.user.workout.length && (
                                    <OverallGraphStat
                                        workouts={allWorkoutsDatas}
                                    />
                                )}
                            </div>

                            <div className="overAllStatsComponentContainer">
                                {/* poids stats */}
                                <div>
                                    {allWorkoutsLoading && (
                                        <div className="loadingContainer">
                                            <CircularProgress />
                                        </div>
                                    )}
                                    {allWorkoutsError && (
                                        <div>{`There was a problem while fetching user data - ${error}`}</div>
                                    )}
                                    {allWorkoutsDatas.length >=
                                        data.user.workout.length && (
                                        <PoidsGraphStat
                                            workouts={allWorkoutsDatas}
                                        />
                                    )}
                                </div>

                                {/* poids stats ( to change en une autre donné biensur :)  */}
                                <div>
                                    {allWorkoutsLoading && (
                                        <div className="loadingContainer">
                                            <CircularProgress />
                                        </div>
                                    )}
                                    {allWorkoutsError && (
                                        <div>{`There was a problem while fetching user data - ${error}`}</div>
                                    )}
                                    {allWorkoutsDatas.length >=
                                        data.user.workout.length && (
                                        <RecupGraphStat
                                            workouts={allWorkoutsDatas}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {workout.length <= 0 && (
                        <div className="main-page--no-workout-container">
                            <h2>Vous n'avez aucun entrainement</h2>
                            <Button
                                variant="contained"
                                className="blueButton"
                                onClick={() => {
                                    toCreateWorkout();
                                }}
                            >
                                Créer un entrainement
                            </Button>
                        </div>
                    )}
                </header>
            )}

            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}

export default MainPage;
