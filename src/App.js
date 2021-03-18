import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LoginPage from './containers/LoginPage';
import NotFound from './containers/NotFound';
import ProfilePage from './containers/ProfilePage';
import ExercisePage from './containers/ExercisePage';
import WorkoutPage from './containers/WorkoutPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container className="App">
        <main>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/profile" component={ ProfilePage } />
            <Route exact path="/viewexercises" component={ ExercisePage } />
            <Route exact path="/viewworkouts" component={ WorkoutPage } />
            <Route exact path="/*" component={ NotFound } />
          </Switch>
        </main>
      </Container>
    </Router>
  );
}

export default App;
