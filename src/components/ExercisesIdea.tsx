import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { MusclesEnum } from "../assets/musclesEnum";

import "./ExercisesIdeaStyle.scss";

const ExercisesIdea = () => {
    const [cookies, setCookie] = useCookies(["user"]);
    const [exercisesList, setExercisesList] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noData, setNoData] = useState(true);
    const [selectedMuscle, setSelectedMuscle] = useState("");

    const getExercisesListForMuscle = (muscle: MusclesEnum) => {
        setNoData(false);
        setLoading(true);
        setExercisesList(null);

        setSelectedMuscle(muscle);

        axios
            .get(process.env.REACT_APP_API_URL + "/exercise?muscle=" + muscle, {
                headers: {
                    "auth-token": cookies.user,
                },
            })
            .then((res) => {
                setExercisesList(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="exercise-idea--container">
                <div className="exercise-idea--muscles-enum-choises">
                    {(Object.keys(MusclesEnum) as Array<MusclesEnum>).map(
                        (muscleKey, i) => (
                            <span
                                key={i}
                                onClick={() =>
                                    getExercisesListForMuscle(muscleKey)
                                }
                                className={
                                    selectedMuscle === muscleKey
                                        ? "selectedMuscle"
                                        : ""
                                }
                            >
                                {
                                    MusclesEnum[
                                        muscleKey as unknown as keyof typeof MusclesEnum
                                    ]
                                }
                            </span>
                        )
                    )}
                </div>

                <div className="exercise-idea--exercise-list-container">
                    {noData && (
                        <span className="no-data-info">
                            Selectionné un muscle pour avoir des exemples
                            d'exercises
                        </span>
                    )}
                    {loading && (
                        <div className="loadingContainer">
                            <CircularProgress />
                        </div>
                    )}
                    {error && (
                        <div>{`There was a problem while fetching data - ${error}`}</div>
                    )}
                    {exercisesList && (
                        <div className="exercise-idea--exercise-list">
                            {exercisesList.map((exercise: any, i: any) => (
                                <div key={i}>
                                    <span className="exoName">
                                        {exercise.name}
                                    </span>
                                    <img
                                        src={exercise.image}
                                        alt={exercise.name}
                                        className="exoImage"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ExercisesIdea;
