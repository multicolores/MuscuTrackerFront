import axios from "axios";

export async function deleteWorkout(
    user: any,
    workoutIdToDelete: any,
    token: any
) {
    const res = await axios.delete(
        process.env.REACT_APP_API_URL + "/workout/" + workoutIdToDelete
    );

    if (res.status === 200) {
        let deleteUserWorkoutResponse = await deleteWorkoutFromUsersWorkout(
            user,
            workoutIdToDelete,
            token
        );
        if (deleteUserWorkoutResponse) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function deleteWorkoutFromUsersWorkout(
    user: any,
    workoutId: any,
    token: any
) {
    let actualUserWorkoutsArray = user.workout;

    const index = actualUserWorkoutsArray.indexOf(workoutId);
    if (index > -1) {
        actualUserWorkoutsArray.splice(index, 1);
    }

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
