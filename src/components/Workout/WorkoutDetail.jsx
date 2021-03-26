import { Card } from "react-bootstrap";
import ExerciseCard from "../Exercise/ExerciseCard";
import { useState, useEffect } from "react";
import { getSetsForWorkout } from "../../utils/workoutAPI";
import { getExerciseById } from "../../utils/exerciseAPI";

function WorkoutDetails(props) {
    const currentWorkout = props.workout;
    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseDetails, setExerciseDetails] = useState([]);

    //Get sets of the workout
    useEffect(() => {
        async function fetchSetData() {
            try {
                const item = await getSetsForWorkout(currentWorkout);
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchSetData().then(sets => {
            setSets(sets);
            setIsLoading(false);
        })
    }, [currentWorkout]);

    //loop list of sets
    function getSet() {
        return sets.map(function (item, i) {
            return (
                <div>
                    {/* {getExersise(item.exercise)} */}
                    <p key={i}>{item.exercise_repetitions}</p>
                </div>
            )
        })
    }

    //create exercise card KESKEN
    async function getExersise(exerciseId) {
        console.log(exerciseId)
        // try {
        //     let item = await getExerciseById(exerciseId);
        //     console.log(item)
        //     return (
        //         <li className="list-group-item">{item.name}</li>
        //         // exercises.map((exercise, index) => 
        //         //     <ExerciseCard key={index} exercise={exercise} />)}
        //     )
        // } catch (error) {
        //     console.error(error.message);
        // }
    }

    return (
        <Card.Body>
            <ul>
                {isLoading && <p>loading</p>}
                {getSet()}
            </ul>
        </Card.Body>
    );
};

export default WorkoutDetails;
