import WorkoutCard from "./WorkoutCard";

function WorkoutList() {

    return (
        <div>
            <h3>All Available Workouts</h3>
            <ul>
                <li>
                    <WorkoutCard/>
                </li>
            </ul>
        </div>
    );
};

export default WorkoutList;
