import { Card } from "react-bootstrap";
import ExerciseCard from "../Exercise/ExerciseCard";
import { useState, useEffect } from "react";
import { getSetsForWorkout } from "../../utils/workoutAPI";
import { getExerciseById } from "../../utils/exerciseAPI";
import {getUserStorage} from '../../utils/userStorage';

function WorkoutDetails(props) {
    const currentWorkout = props.workout;
    const [sets, setSets] = useState([]);
    const [exerciseIds, setExerciseIds] = useState([]);
    const [repetitions, setRepetitions] = useState([]);
    const [exercises, setExercises] = useState([]);
    const {token} = getUserStorage('ra_session')

    // Get sets of the workout
    useEffect(() => {
        async function fetchSetData() {
            try {
                const item = await getSetsForWorkout(currentWorkout, token);
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchSetData().then(setsdata => {
            setSets(setsdata);
        }) 
    }, [token, currentWorkout]);

    // get repetitions and exercise id's
    useEffect(() => {
        const repetition = [];
        const id = [];
        sets.map(item => {
            repetition.push(item.exercise_repetitions)
            id.push(item.exercise)
        })
        setRepetitions(repetition);
        setExerciseIds(id);  
    }, [currentWorkout, sets]);

    //get ecersice by id
    useEffect(() => {
        async function fetchExersiseData(exerciseId) {
            try {
                const item = await getExerciseById(exerciseId, token);
                setExercises(oldArray => [...oldArray, item]);
            } catch (error) {
                console.error(error.message);
            }
        }
        if (exercises.length == 0) {
            exerciseIds.map(item => {
                fetchExersiseData(item);
            })
        }
    }, [repetitions, exerciseIds, sets]);

    console.log(sets)

    return (
        <Card.Body>
            <ul>
                {exercises.length == 0 && <p>No exercises included to this workout</p>}
                {exercises.map((exercise, i) =>
                    <div key={i}>
                        <p className="repetitions-text">Repetitions: {repetitions[i]}</p>
                        <ExerciseCard exercise={exercise} />
                    </div>
                )}
            </ul>
        </Card.Body>
    );
};

export default WorkoutDetails;
