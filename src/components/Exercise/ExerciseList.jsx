import ExerciseCard from "./ExerciseCard";

function ExerciseList() {

    return (
        <div>
            <h3>All Available Exercises</h3>
            <ul>
                <li>
                    <ExerciseCard/>
                </li>
                <li>
                    <ExerciseCard/>
                </li>
            </ul>
        </div>
    );
};

export default ExerciseList;
