import React from "react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./WorkoutStyle.scss";

function OverallStats(props: { workouts: any[] }) {
    const [data, setData] = useState({ trainingsNumber: 0, repsNumber: 0 });

    useEffect(() => {
        let i = 0;
        let reps = 0;
        let trainings = 0;
        props.workouts.map((workout) => {
            i++;
            workout.exercise.forEach((exercise: any) => {
                exercise.repetition.forEach((repetition: any) => {
                    for (let i = 2; i < repetition.length; i++) {
                        reps += repetition[i];
                    }
                    trainings += 1;
                });
                trainings -= 1;
            });
            if (i >= props.workouts.length) {
                setData({ trainingsNumber: trainings, repsNumber: reps });
            }
        });
    }, []);

    return (
        <>
            {!data && (
                <div className="loadingContainer">
                    <CircularProgress />
                </div>
            )}
            {data && (
                <>
                    <div className="trainingNumber">
                        <h3>{data.trainingsNumber}</h3>
                        <span>nombre total d'entrainement</span>
                    </div>
                    <div className="repNumber">
                        <h3>{data.repsNumber}</h3>
                        <span>nombre total de répétition effectuée</span>
                    </div>
                </>
            )}
        </>
    );
}

export default OverallStats;
