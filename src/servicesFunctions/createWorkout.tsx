import axios from "axios";

export function createWorkout(
    user: any,
    workoutToCreate: any,
    token: any
): boolean {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify(workoutToCreate),
    };
    fetch(process.env.REACT_APP_API_URL + "/workout", requestOptions)
        .then(async (response) => {
            const isJson = response.headers
                .get("content-type")
                ?.includes("application/json");
            const data = isJson && (await response.json());
            if (response.ok) {
                let updateResponse = addNewUserWorkout(user, data, token);
                if (await updateResponse) {
                    return true;
                }
            }
        })
        .catch((error) => {
            console.error("Une erreur !", error);
            return false;
        });

    return true;
}

async function addNewUserWorkout(user: any, workoutInfo: any, token: any) {
    let actualUserWorkoutsArray = user.workout;
    actualUserWorkoutsArray.push(workoutInfo._id);

    const options = {
        headers: {
            "auth-token": token,
        },
    };
    let res = await axios.patch(
        process.env.REACT_APP_API_URL + "/user/" + user._id,
        { workout: actualUserWorkoutsArray },
        options
    );
    return res.data;
}
