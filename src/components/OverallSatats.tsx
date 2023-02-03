import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import "./WorkoutStyle.scss";

function OverallStats(props: { workouts: string[] }) {
    const [cookies, setCookie] = useCookies(["user"]);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let reps = 0;
    let trainings = 0;

    useEffect(() => {
        fetchAllWorkoutsData();
    }, []);

    const fetchAllWorkoutsData = () => {
        setData([]);
        props.workouts.map((workoutId) => {
            // console.log(workoutId);
            axios
                .get(process.env.REACT_APP_API_URL + "/workout/" + workoutId, {
                    headers: {
                        "auth-token": cookies.user,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setData((oldData: any) => [...oldData, res.data]);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err.message);
                    setError(err.message);
                    setData(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
        console.log(data);
    };

    return (
        <>
            {loading && (
                <div className="loadingContainer">
                    <CircularProgress />
                </div>
            )}
            {error && (
                <div>{`There was a problem while fetching data - ${error}`}</div>
            )}

            {data && (
                <>
                    {data.map((workout: any) =>
                        workout.exercise.forEach((exercise: any) => {
                            exercise.repetition.forEach((repetition: any) => {
                                console.log(repetition);
                                for (let i = 2; i < repetition.length; i++) {
                                    reps += repetition[i];
                                }
                                trainings += 1;
                            });
                            trainings -= 1;
                        })
                    )}
                    <div className="trainingNumber">
                        <h3>{trainings}</h3>
                        <span>nombre total d'entrainement</span>
                    </div>
                    <div className="repNumber">
                        <h3>{reps}</h3>
                        <span>nombre total de répétition effectuer</span>
                    </div>
                </>
            )}
        </>
    );
}

export default OverallStats;
