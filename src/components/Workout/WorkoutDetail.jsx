import { Card } from "react-bootstrap";
import ExerciseCard from "../Exercise/ExerciseCard";
import { useState, useEffect } from "react";
import { getSetsForWorkout } from "../../utils/workoutAPI";
import { getExerciseById } from "../../utils/exerciseAPI";

function WorkoutDetails(props) {
    const currentWorkout = props.workout;
    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseIds, setExerciseIds] = useState([]);
    const [repetitions, setRepetitions] = useState([]);
    const [exercises, setExercises] = useState([]);

    // Get sets of the workout
    useEffect(() => {
        async function fetchSetData() {
            try {
                const item = await getSetsForWorkout(currentWorkout);
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }

        async function fetchExersiseData(exerciseId) {
            try {
                const item = await getExerciseById(exerciseId);
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchSetData().then(setsdata => {
            setSets(setsdata);

            const repetition = [];
            const id = [];
            sets.map(item => {
                repetition.push(item.exercise_repetitions)
                id.push(item.exercise)
            })
            setRepetitions(repetition);
            setExerciseIds(id);

            if (exercises.length == 0 && exercises.length <= repetitions.length) {

                addExerciseToList();
            }
        })
    }, [currentWorkout]);

    // map exerrcise id`s and get data
    function addExerciseToList() {
        exerciseIds.map(item => {
            fetchExersiseData(item);
        })
    }

    // get exercise by id
    async function fetchExersiseData(exerciseId) {
        const item = await getExerciseById(exerciseId);
        setExercises(oldArray => [...oldArray, item]);
    }

    // console.log(sets) //sets latautuu kun sivu latautuu
    // console.log(exerciseIds) //ok
    // console.log(repetitions)// ok
    // console.log(exercises)

    return (
        <Card.Body>
            <ul>
                {exercises.map((exercise, i) =>
                    <div>
                        <p>Repetitions: {repetitions[i]}</p>
                        <ExerciseCard exercise={exercise} />
                    </div>
                )}
            </ul>
        </Card.Body>

    );
};

export default WorkoutDetails;
