import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NotFound from './containers/NotFound';
import ProfilePage from './containers/ProfilePage';
import ExercisePage from './containers/ExercisePage';
import WorkoutPage from './containers/WorkoutPage';
import ProgramPage from './containers/ProgramPage';
import DashBoardPage from './containers/DashBoardPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeycloakConnection from './components/KeycloakConnection';
import ApplicationFrame from './components/ApplicationFrame';

function App() {
  return (
    <div>
      <Router>
        <Container className="App">
          <ApplicationFrame />
          <main>
            <Switch>
              <Route exact path="/" component={DashBoardPage} />
              <Route exact path="/dashboard" component={DashBoardPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/exercises" component={ExercisePage} />
              <Route exact path="/workouts" component={WorkoutPage} />
              <Route exact path="/programs" component={ProgramPage} />
              <Route exact path="/*" component={NotFound} />
            </Switch>
          </main>
        </Container>
      </Router>
    </div>
  );
}

export default App;
