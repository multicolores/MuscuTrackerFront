import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useCookies } from "react-cookie";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import "./WorkoutStyle.scss";
import ConfirmDialog from "./materialUI/ConfirmDialog";
import AddTrainingDialog from "./materialUI/AddTrainingDialog";
import { deleteWorkout } from "../servicesFunctions/deleteWorkout";
import Graphique from "./Graphique";

function Workout(props: any) {
    const [cookies, setCookie] = useCookies(["user"]);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [AddTrainingbt, setAddTrainingbt] = useState(false);
    const [showWorkout, setShowWorkout] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
        onConfirm: () => {
            buttonDeleteWorkout();
        },
    });
    const [addTrainingDialog, setAddTrainingDialog] = useState({
        isOpen: false,
        workout: { repetition: [[0]] },
        onConfirm: null,
    });

    const workout_id = props.workout_id;

    useEffect(() => {
        fetchTrainingsData();
    }, []);

    function fetchTrainingsData() {
        axios
            .get(process.env.REACT_APP_API_URL + "/workout/" + workout_id, {
                headers: {
                    "auth-token": cookies.user,
                },
            })
            .then((res) => {
                setData(res.data);
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
    }

    function ShowExercises() {
        let items = [];
        for (let i = 0; i < data.exercise.length; i++) {
            items.push(
                <div className="exerciseTable">
                    <div className="content_container">
                        <AddTrainingDialog
                            exercise={data.exercise[i]}
                            workout={data}
                            reloadTrainings={fetchTrainingsData}
                        />
                        <div className="exoInfo">
                            <span>{data.exercise[i].name}</span>
                        </div>
                        <div className="repsContainer">
                            {data.exercise[i].repetition.map((row: any) => (
                                <div className="repRow" key={Math.random()}>
                                    <div className="reps">
                                        {exercieRep(row)}
                                    </div>
                                    <div className="weightAndRecupContainer">
                                        <span>{row[0]}</span>
                                        <span>{row[1]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="graphique_container">
                        <Graphique data={data.exercise[i].repetition} />
                    </div>
                </div>
            );
        }
        return items;
    }
    function exercieRep(repArray: any) {
        let repRow = [];
        if (repArray.length > 2) {
            for (let e = 2; e < repArray.length; e++) {
                repRow.push(<span>{repArray[e]}</span>);
            }
        }
        return repRow;
    }

    function buttonDeleteWorkout() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });

        const deleteCall = async () => {
            let res = await deleteWorkout(props.user, data._id, cookies.user);
            if (res) {
                props.setNotify({
                    isOpen: true,
                    message: "Workout Supprimer",
                    type: "success",
                });
                props.reloadDatas();
            } else {
                props.setNotify({
                    isOpen: true,
                    message: "something went wrong, please try again",
                    type: "error",
                });
            }
        };
        deleteCall();
    }

    return (
        <div className="workoutContainer">
            {loading && (
                <div className="loadingContainer">
                    <CircularProgress />
                </div>
            )}
            {error && (
                <div>{`There was a problem while fetching user data - ${error}`}</div>
            )}
            {data && (
                <>
                    <div className="workoutCard_container">
                        {/* <DeleteIcon className="deleteIcon" /> */}
                        <IconButton
                            aria-label="delete"
                            className="deleteIcon"
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: "Do you really want to delete this workout ?",
                                    subTitle: "",
                                    onConfirm: () => {
                                        buttonDeleteWorkout();
                                    },
                                });
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <div
                            onClick={() => {
                                setShowWorkout(!showWorkout);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <h2>{data.name}</h2>
                            <span className="date">12/03/2022</span>
                            <span className="description">
                                {data.description}
                            </span>
                            <div className="exoInfo_container">
                                {data.exercise.map((exercise: any) => (
                                    <div
                                        className="exoInfo"
                                        key={Math.random()}
                                    >
                                        <span>{exercise.name}</span>
                                        <span>
                                            {exercise.repetition.length - 1}{" "}
                                            training
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "workoutsDetailsContainer " +
                            (showWorkout ? "show" : "hidden")
                        }
                    >
                        <h1>{data.name}</h1>
                        <div
                            className="closeButton"
                            onClick={() => {
                                setShowWorkout(!showWorkout);
                            }}
                        >
                            <IconButton
                                aria-label="close icon"
                                component="span"
                                size="large"
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <div className="tableContainer">{ShowExercises()}</div>
                    </div>
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </>
            )}
        </div>
    );
}

export default Workout;
