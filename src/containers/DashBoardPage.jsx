import { Button, Form, FormControl, Container, ButtonGroup, Col } from "react-bootstrap";
import './DashBoardPage.css';
import GetGoals from '../components/Dashboard/GetGoals';


function DashBoardPage() {

    let date = new Date();
    let time = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full', timeStyle: 'short'
    }).format(date);



    return (
        <div>
            <h4>{time}</h4>
            <GetGoals />
        </div>


    )

}

export default DashBoardPage