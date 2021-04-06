import ExerciseCard from "./ExerciseCard";
import { Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from 'react'

function ExerciseList(props) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        geData()
    }, [props]);

    async function geData() {
        try {
            const item = await props.exercises;
            setExercises(item);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    function onTargetMuscleGroupChanged(e) {
        let filtered = exercises.filter(function (item) {
            return item.target_muscle_group.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });
        setExercises(filtered);
        if (e.target.value === "") {
            geData()
        }
    }

    return (
        <div>
            <div className="nav justify-content-center">
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 search-bar" onChange={onTargetMuscleGroupChanged} />
                </Form>
            </div>
            <ul>
                {isLoading && <p>loading</p>}
                {exercises.length !== 0 && exercises.map((exercise, index) => <ExerciseCard key={index} exercise={exercise} />)}
            </ul>
        </div>
    );
};

export default ExerciseList;