import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import "./AddTrainingDialog.scss";
import Notification from "./Notification";
import { updateWorkout } from "../../servicesFunctions/updateWorkout";

export default function AddTrainingDialog(props: any) {
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    console.log(props);
    const exerciseTab = props.exercise;
    console.log(exerciseTab);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let weight = props.exercise.weight;
    let recup = props.exercise.recuperation;
    const changeWeight = (e: any) => {
        console.log(weight);
        weight = e.target.value;
        console.log(weight);
    };
    const changeRecup = (e: any) => {
        console.log(recup);
        recup = e.target.value;
        console.log(recup);
    };

    let TrainingrepsArray: any[] = [];

    const handleChange = (e: any) => {
        console.log("handleChange");
        let arrayPosition = parseInt(e.target.id.split("_").pop());
        TrainingrepsArray[arrayPosition] = e.target.value;
        console.log(TrainingrepsArray);
    };

    let items: JSX.Element[] = [];
    function exerciseRep() {
        for (let i = 0; i < 5; i++) {
            items.push(
                <input
                    type="text"
                    key={i}
                    onChange={handleChange}
                    id={`setNumber_${i}`}
                />
            );
        }
        return items;
    }

    async function handleSubmit(e: any) {
        console.log("SUBMIT");
        let FinalArray = [];
        e.preventDefault();
        for (let i = 0; i < e.target.length - 2; i++) {
            if (i === 0 || i === 1) {
                if (e.target[i].value) FinalArray.push(e.target[i].value);
                else if (i === 0) FinalArray.push(props.exercise.weight);
                else if (i === 1) FinalArray.push(props.exercise.recuperation);
            } else {
                FinalArray.push(parseInt(e.target[i].value));
            }
        }
        console.log(FinalArray);
        console.log(props.workout);
        console.log(props.exercise);
        await updateWorkout(FinalArray, props.workout, props.exercise);
        setNotify({
            isOpen: true,
            message: "Sets has been created",
            type: "success",
        });
        props.reloadTrainings();
        setOpen(false);
    }
    return (
        <>
            <Notification notify={notify} setNotify={setNotify} />
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                className="btAddTraining borderButton"
            >
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose} className="test">
                <div className="addTraining_DialogContainer">
                    <h3>{props.exercise.name} training</h3>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <div className="weightRecup_input">
                                <input
                                    type="text"
                                    onChange={changeWeight}
                                    placeholder={props.exercise.weight}
                                />
                                <input
                                    type="text"
                                    onChange={changeRecup}
                                    placeholder={props.exercise.recuperation}
                                />
                            </div>
                            <div className="reps_input">
                                <div className="reps_container">
                                    {exerciseRep()}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <div className="buttons_Container">
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    className="simpleBorderButton"
                                >
                                    Cancel
                                </Button>
                                <input
                                    type="submit"
                                    value="Confirm"
                                    className="submitInput"
                                />
                            </div>
                        </DialogActions>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
