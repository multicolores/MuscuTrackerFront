import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import "./AddTrainingDialog.scss";
import Notification from "./Notification";
import { updateWorkout } from "../../servicesFunctions/updateWorkout";
import {
    add15secondes,
    remove15secondes,
} from "../../servicesFunctions/handleTime";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCookies } from "react-cookie";

export default function AddTrainingDialog(props: any) {
    const [cookies, setCookie] = useCookies(["user"]);
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });
    const [recup, setRecup] = useState(props.exercise.recuperation);
    const [weight, setWeight] = useState(props.exercise.weight);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let TrainingrepsArray: any[] = [];

    const handleChange = (e: any) => {
        let arrayPosition = parseInt(e.target.id.split("_").pop());
        TrainingrepsArray[arrayPosition] = e.target.value;
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
        let FinalArray = [];
        e.preventDefault();
        for (let i = 0; i < e.target.length - 2; i++) {
            if (i === 0 || i === 1) {
                if (e.target[i].value) FinalArray.push(e.target[i].value);
                else if (i === 0) FinalArray.push(weight);
                else if (i === 1) FinalArray.push(recup);
            } else {
                FinalArray.push(parseInt(e.target[i].value));
            }
        }

        await updateWorkout(
            FinalArray,
            props.workout,
            props.exercise,
            cookies.user
        );
        setNotify({
            isOpen: true,
            message: "Sets has been created",
            type: "success",
        });
        props.reloadTrainings();
        props.reloadDatas();
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
                                <div className="poids">
                                    <IconButton
                                        aria-label="close icon"
                                        component="span"
                                        size="large"
                                        onClick={() => {
                                            setWeight(
                                                parseInt(
                                                    weight.replace("kg", "")
                                                ) -
                                                    1 +
                                                    "kg"
                                            );
                                        }}
                                    >
                                        <RemoveIcon fontSize="inherit" />
                                    </IconButton>
                                    <input
                                        type="text"
                                        readOnly={true}
                                        value={weight}
                                    />
                                    <IconButton
                                        aria-label="close icon"
                                        component="span"
                                        size="large"
                                        onClick={() => {
                                            setWeight(
                                                parseInt(
                                                    weight.replace("kg", "")
                                                ) +
                                                    1 +
                                                    "kg"
                                            );
                                        }}
                                    >
                                        <AddIcon fontSize="inherit" />
                                    </IconButton>
                                </div>

                                <div className="recup">
                                    <IconButton
                                        aria-label="close icon"
                                        component="span"
                                        size="large"
                                        onClick={() => {
                                            setRecup(remove15secondes(recup));
                                        }}
                                    >
                                        <RemoveIcon fontSize="inherit" />
                                    </IconButton>
                                    <input
                                        type="text"
                                        readOnly={true}
                                        value={recup}
                                    />
                                    <IconButton
                                        aria-label="close icon"
                                        component="span"
                                        size="large"
                                        onClick={() => {
                                            setRecup(add15secondes(recup));
                                        }}
                                    >
                                        <AddIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
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
