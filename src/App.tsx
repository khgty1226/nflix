import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home"
import MovieRouter from "./apps/nflix/MovieRouter";
import Tv from "./components/Tv";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
    return (
        <Router basename="/nflix">
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path={`/tv`} >
                    <Tv/>
                </Route>
                <Route path={`/search`}>
                    <Search/>
                </Route>
                <Route path={`/movies/:movieId`}>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;