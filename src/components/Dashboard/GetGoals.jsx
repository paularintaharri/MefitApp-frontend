import { useEffect, useState, useRef } from 'react';
import './GetGoals.css';
import { getUserStorage } from '../../utils/userStorage';

function GetGoals() {



    const { token, tokenParsed } = getUserStorage('ra_session')
    const id = tokenParsed.sub;
    const url = `https://me-fit-app.herokuapp.com/api/v1/profiles/${id}/goals`;
    const [goals, setGoals] = useState({});

    useEffect(() => {
        if (id) {
            getGoalData().then(data => {
                setGoals(data)
                console.log("goals added: " + JSON.stringify(goals));
            })
        }
    }, []);

    async function getGoalData() {
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
            console.log("incoming goals: " + JSON.stringify(responseJson));
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }



    return (

        <div>
            <h3>{goals[0]}</h3>
        </div>
    )

}

export default GetGoals