import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/create-workouts.scss";
import Notification from "../components/materialUI/Notification";
import { createWorkout } from "../servicesFunctions/createWorkout";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import create_workout_image from "../images/create_workout_image.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function CreateWorkout() {
    const [exerciseNumber, setexerciseNumber] = useState(1);
    const location = useLocation();
    const [cookies, setCookie] = useCookies(["user"]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const user = location.state["user"];
    //info : There's no difference, location.state["user"] just doesn't get type checked. So, it's more of a workaround  (location.state.user doesn't work)

    async function CreateTheWorkout(e: any) {
        // dans le future : go importer cette fonction des services ( pitet plustot la fonction qui fait appelle a l'api avec les bon truc en props dedans)
        let formArray = [];
        let exercisesArrayToSend = [];
        // for (let i = 0; i < e.target.length - 1; i++) {
        //   formArray.push(e.target[i].value);
        //   console.log(e.target[i].name);
        // }
        for (let i = 1; i < e.target.length - 2; i++) {
            formArray.push(e.target[i].value);
            // console.log(e.target[i].name);
        }
        // console.log(formArray.length / 4);
        let separation = 3;
        for (let i = 0; i < formArray.length / 3; i++) {
            let objectArray = formArray
                .slice()
                .splice(separation - 3, separation);
            let exerciseObject = {
                name: objectArray[0],
                repetition: "",
                recuperation: objectArray[1],
                weight: objectArray[2],
            };
            exercisesArrayToSend.push(exerciseObject);
            separation = separation + 3;
        }

        let workoutObject = {
            name: e.target[0].value,
            exercise: exercisesArrayToSend,
            description: "Description de la scéance",
        };

        if (createWorkout(user, workoutObject, cookies.user)) {
            setNotify({
                isOpen: true,
                message: "Workout created !",
                type: "success",
            });
            setexerciseNumber(0);
        } else {
            setNotify({
                isOpen: true,
                message: "Erreur",
                type: "error",
            });
        }
        e.preventDefault();
    }

    function exercisesInputs() {
        let inputsDom = [];
        for (let i = 0; i < exerciseNumber; i++) {
            inputsDom.push(
                <div className="exercisesInputs">
                    <label htmlFor={"exoname" + i}>Exercise's Name :</label>
                    <input type="text" name={"exoname" + i} />
                    {/* <label htmlFor={"exoNbSet" + i}>Set number:</label>
          <input type="text" name={"exoNbSet" + i} /> */}
                    <label htmlFor={"recuperation" + i}>Recuperation :</label>
                    <input type="text" name={"recuperation" + i} />
                    <label htmlFor={"weight" + i}>Weight :</label>
                    <input type="text" name={"weight" + i} />
                </div>
            );
        }

        return inputsDom;
    }
    return (
        <div className="creatWorkout_container">
            <Link to="/main" className="btGoBackMainPage">
                <Button
                    variant="contained"
                    className="multiRoundedButton_white"
                >
                    <ArrowBackIosNewIcon className="icon-in-button" />
                </Button>
            </Link>
            <div className="form_container">
                <h1>Create a workout</h1>
                <form onSubmit={CreateTheWorkout}>
                    <div>
                        <label htmlFor="workoutname">Workout's Name :</label>
                        <input type="text" name="workoutname" />
                    </div>

                    {exercisesInputs()}
                    <Button
                        variant="contained"
                        className="multiRoundedButton_white submitButton"
                    >
                        <FitnessCenterIcon className="icon-in-button" />
                        <input
                            type="submit"
                            value="Create workout"
                            className="submitInput"
                        />
                    </Button>
                </form>

                <div className="btAddContainer">
                    <div className="fixed_container">
                        <Button
                            variant="contained"
                            className="multiRoundedButton_white"
                            onClick={() => {
                                setexerciseNumber(exerciseNumber + 1);
                            }}
                        >
                            <AddIcon className="icon-in-button" />
                            Add exercise
                        </Button>
                        <Button
                            variant="contained"
                            className="multiRoundedButton_white btAddExo"
                            onClick={() => {
                                setexerciseNumber(exerciseNumber - 1);
                            }}
                        >
                            <RemoveIcon className="icon-in-button" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="right_side_container">
                <img
                    src={create_workout_image}
                    alt="create_workout logo musculation"
                    className="image_container"
                />
            </div>

            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}

export default CreateWorkout;
