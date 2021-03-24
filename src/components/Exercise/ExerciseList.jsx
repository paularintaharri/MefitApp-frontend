import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from 'react'

function ExerciseList(props) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        geData().then(exercises => {
            setExercises(exercises);
            setIsLoading(false);
        })
    }, [exercises]);

    async function geData() {
        try {
            const item = await props.exercises;
            return item;
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <ul>
                {isLoading && <p>loading</p>}
                {exercises.length !== 0 && exercises.map((exercise, index) => <ExerciseCard key={index} exercise={exercise} />)}
            </ul>
        </div>
    );
};

export default ExerciseList;