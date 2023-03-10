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

const arrayOfPossibleRecup = [
    "45s",
    "1min",
    "1min15s",
    "1min30s",
    "1min45s",
    "2min",
    "2min15s",
    "2min30s",
    "2min45s",
    "3min",
    "3min15s",
    "3min30s",
];

function CreateWorkout() {
    const [exerciseNumber, setexerciseNumber] = useState(1);
    const location = useLocation();
    const [cookies, setCookie] = useCookies(["user"]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });

    const user = location.state["user"];

    async function CreateTheWorkout(e: any) {
        let formArray = [];
        let exercisesArrayToSend = [];

        for (let i = 2; i < e.target.length - 2; i++) {
            formArray.push(e.target[i].value);
        }

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
            description: e.target[1].value,
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
                <div className="exercisesInputs" key={i}>
                    <label htmlFor={"exoname" + i}>Exercise's Name :</label>
                    <input type="text" name={"exoname" + i} />
                    <label htmlFor={"recuperation" + i}>Recuperation :</label>
                    <select name={"recuperation" + i}>
                        {arrayOfPossibleRecup.map((recup, i) => (
                            <option value={recup} key={i}>
                                {recup}
                            </option>
                        ))}
                    </select>

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
                <Button variant="contained" className="simpleButton">
                    <ArrowBackIosNewIcon className="icon-in-button" />
                </Button>
            </Link>
            <div className="form_container">
                <h1>Create a workout</h1>
                <form onSubmit={CreateTheWorkout}>
                    <div>
                        <label htmlFor="workoutname">
                            Nom de l'entrainement :
                        </label>
                        <input type="text" name="workoutname" />

                        <label htmlFor="workoutdescription">
                            Description de l'entrainement:
                        </label>
                        <input
                            type="text"
                            name="workoutdescription"
                            className="workoutdescription_input"
                        />
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
                            className="simpleButton"
                            onClick={() => {
                                setexerciseNumber(exerciseNumber + 1);
                            }}
                        >
                            <AddIcon className="icon-in-button" />
                            Ajouter un exercice
                        </Button>
                        <Button
                            variant="contained"
                            className="simpleButton"
                            onClick={() => {
                                if (exerciseNumber > 1)
                                    setexerciseNumber(exerciseNumber - 1);
                            }}
                        >
                            <RemoveIcon />
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
