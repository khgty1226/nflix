import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home"
import MovieRouter from "./apps/nflix/MovieRouter";

function App() {
    return (
        <Router basename="/react-projects">
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/nflix">
                    <MovieRouter/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;