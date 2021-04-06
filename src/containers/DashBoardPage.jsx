import { Button, Form, FormControl, Container, ButtonGroup, Col } from "react-bootstrap";
import './DashBoardPage.css';
import GetGoals from '../components/Dashboard/GetGoals';
import Clock from '../components/Dashboard/Clock';
import { useEffect, useState } from "react";


function DashBoardPage() {

    return (

        <div>
            <br />
            <Clock />
            <br />
            <GetGoals />
        </div>
    )
}

export default DashBoardPage