import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NotFound from './containers/NotFound';
import ProfilePage from './containers/ProfilePage';
import ExercisePage from './containers/ExercisePage';
import WorkoutPage from './containers/WorkoutPage';
import ProgramPage from './containers/ProgramPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeycloakConnection from './components/KeycloakConnection';

function App() {
  return (
    <Router>
      <Container className="App">
        <main>
          <Switch>     
            <Route exact path="/" component={ NotFound } />
            <Route exact path="/profile" component={ ProfilePage } />
            <Route exact path="/exercises" component={ ExercisePage } />
            <Route exact path="/workouts" component={ WorkoutPage } />
            <Route exact path="/programs" component={ ProgramPage } />
            <Route exact path="/*" component={ NotFound } />
          </Switch>
        </main>
      </Container>
    </Router>
  );
}

export default App;
