import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/create-workouts.scss";
import Notification from "../components/materialUI/Notification";
import { createWorkout } from "../servicesFunctions/createWorkout";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function CreateWorkout() {
  const [exerciseNumber, setexerciseNumber] = useState(1);
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["user"]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log(location.state);
  const user = location.state["user"];
  //info : There's no difference, location.state["user"] just doesn't get type checked. So, it's more of a workaround  (location.state.user doesn't work)
  console.log(user);

  async function CreateTheWorkout(e: any) {
    // dans le future : go importer cette fonction des services ( pitet plustot la fonction qui fait appelle a l'api avec les bon truc en props dedans)
    console.log(e);
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
    console.log(formArray);
    // console.log(formArray.length / 4);
    let separation = 3;
    for (let i = 0; i < formArray.length / 3; i++) {
      let objectArray = formArray.slice().splice(separation - 3, separation);
      console.log(objectArray);
      let exerciseObject = {
        name: objectArray[0],
        repetition: "",
        recuperation: objectArray[1],
        weight: objectArray[2],
      };
      exercisesArrayToSend.push(exerciseObject);
      separation = separation + 3;
    }
    console.log(exercisesArrayToSend);

    let workoutObject = {
      name: e.target[0].value,
      exercise: exercisesArrayToSend,
      description: "Description de la sc??ance",
    };
    console.log(workoutObject);

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
      <div className="headerContainer">
        <h1>Create a workout</h1>
        <Link to="/main" className="btGoBackMainPage">
          <Button variant="contained" className="gradientButton">
            Go Back to main page
          </Button>
        </Link>
      </div>

      <form onSubmit={CreateTheWorkout}>
        <div>
          <label htmlFor="workoutname">Workout's Name :</label>
          <input type="text" name="workoutname" />
        </div>

        {exercisesInputs()}
        <Button variant="contained" className="borderButton">
          <input type="submit" value="Create workout" className="submitInput" />
        </Button>
      </form>
      <div className="btAddContainer">
        <Button
          variant="contained"
          className="btAddExo"
          onClick={() => {
            setexerciseNumber(exerciseNumber + 1);
          }}
        >
          Add exercise
        </Button>
        <Button
          variant="contained"
          className="btAddExo"
          onClick={() => {
            setexerciseNumber(exerciseNumber - 1);
          }}
        >
          -
        </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default CreateWorkout;