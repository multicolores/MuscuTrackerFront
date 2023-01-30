import axios from "axios";

export function createWorkout(
  user: any,
  workoutToCreate: any,
  token: any
): boolean {
  // ne prend pas encore de token en header
  //   console.log(trainingArray);
  //   console.log(workoutData);
  //   console.log(referenceExercise);

  // const options = {
  //   headers: {
  //       "auth-token": cookies.user,
  //   }
  //  }

  console.log(workoutToCreate);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workoutToCreate),
  };
  fetch(process.env.REACT_APP_API_URL+"/workout", requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      console.log(response);
      console.log(data);
      if (response.ok) {
        let updateResponse = addNewUserWorkout(user, data, token);
        console.log(updateResponse);
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
  console.log(user);
  console.log(workoutInfo);
  console.log(workoutInfo._id);
  console.log(token);
  let actualUserWorkoutsArray = user.workout;
  actualUserWorkoutsArray.push(workoutInfo._id);
  console.log(actualUserWorkoutsArray);

  const options = {
    headers: {
      "auth-token": token,
    },
  };
  let res = await axios.patch(
    process.env.REACT_APP_API_URL+"/user/" + user._id,
    { workout: actualUserWorkoutsArray },
    options
  );
  return res.data;
}