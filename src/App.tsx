import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./movie/components/Home"
import Tv from "./tv/components/Tv";
import Search from "./movie/components/Search";
import Header from "./movie/components/Header";

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
                <Route path={`/tv/:tvId`}>
                    <Tv/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;