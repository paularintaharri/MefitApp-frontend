import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from 'react'

function ExerciseList(props) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        async function geData() {
            try {
                const item = await props.exercises;
                setExercises(item);
            } catch (error) {
                console.error(error.message);
            }
        }
        geData()
    }, []);
    return (
        <div>
            <ul>
                {exercises.length !== 0 && exercises.map((exercise, index) => <ExerciseCard key={index} exercise={exercise} />)}
            </ul>
        </div>
    );
};

export default ExerciseList;