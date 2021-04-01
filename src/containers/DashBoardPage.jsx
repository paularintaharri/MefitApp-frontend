import { Button, Form, FormControl, Container, ButtonGroup, Col } from "react-bootstrap";
import './DashBoardPage.css';
import GetGoals from '../components/Dashboard/GetGoals';
import { useEffect, useState } from "react";


function DashBoardPage() {

    let date = new Date();
    const [time, setTime] = useState("");

    useEffect(() => {
        //    setTime(new Intl.DateTimeFormat('en-GB', {
        //       dateStyle: 'full', timeStyle: 'long'
        //   }).format(date));

        setInterval(() => {
            setTime(
                new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'full', timeStyle: 'long'
                }).format(date));


        }, 100)

    }, [])

    return (
        <div>
            <h4>{time}</h4>
            <GetGoals />
        </div>


    )

}

export default DashBoardPage