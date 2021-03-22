import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from 'react'
import { getAllExercises } from '../../utils/exerciseAPI'

function ExerciseList() {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const item = await getAllExercises();
            setExercises(item);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <ul>
                {exercises.map((exercise, index) => <ExerciseCard key={index} exercise={exercise} />)}
            </ul>
        </div>
    );
};

export default ExerciseList;