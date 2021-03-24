import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from 'react'

function ExerciseList(props) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function geData() {
            try {
                const item = await props.exercises;
                setExercises(item);
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }
        geData()
    }, []);
    return (
        <div>
            <ul>
                {!isLoading && exercises.map((exercise, index) => <ExerciseCard key={index} exercise={exercise} />)}
            </ul>
        </div>
    );
};

export default ExerciseList;