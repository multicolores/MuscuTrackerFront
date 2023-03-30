import axios from "axios";

export async function updateWorkout(
    trainingArray: any,
    workoutData: any,
    referenceExercise: any,
    token: string
) {
    workoutData.exercise.forEach((exo: any) => {
        if (exo.name === referenceExercise.name) {
            exo.repetition.unshift(trainingArray);
        }
    });

    const options = {
        headers: {
            "auth-token": token,
        },
    };

    let res = await axios.patch(
        process.env.REACT_APP_API_URL + "/workout/" + workoutData._id,
        { exercise: workoutData.exercise, date: Date.now() },
        options
    );
    return res.data;
}
