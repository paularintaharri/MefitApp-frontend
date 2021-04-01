import WorkoutCard from "./WorkoutCard";
import { useState, useEffect } from 'react'
import { Form, FormControl } from "react-bootstrap";

function WorkoutList(props) {
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        geData()
    }, []);

    async function geData() {
        try {
            const item = await props.workouts;
            setWorkouts(item);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    function onTypeChanged(e) {
        let filtered = workouts.filter(function (item) {
            return item.type.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });
        setWorkouts(filtered);
        if (e.target.value === "") {
            geData()
        }
    }

    return (
        <div>
            <div className="nav justify-content-center">
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onTypeChanged} />
                </Form>
            </div>
            <ul>
                {isLoading && <p>loading</p>}
                {workouts.length !== 0 && workouts.map((workout, index) => <WorkoutCard key={index} workout={workout} />)}
            </ul>
        </div>
    );
};

export default WorkoutList;
