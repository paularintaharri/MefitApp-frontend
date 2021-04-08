export async function getGoalData(token, tokenParsed) {

    let id = tokenParsed.sub;
    const url = `https://me-fit-app.herokuapp.com/api/v1/profiles/${id}/goals`;

    if (tokenParsed) {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }
}

export async function getWorkoutData(token, goal) {

    let id = goal.id;
    console.log("apissa id: " + id);
    const url = `https://me-fit-app.herokuapp.com/api/v1/goals/${id}/workouts`;

    if (goal) {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }
}