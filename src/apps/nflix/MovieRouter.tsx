import { Switch, Route, useRouteMatch} from "react-router-dom";
import Tv from "./components/Tv";
import Search from "./components/Search";
import Home from "./components/Home";
import Header from "./components/Header";

function MovieRouter(){
    const {path} = useRouteMatch();
    return (
        <>
        <Header/>
            <Switch>
                <Route exact path={path}>
                    <Home/>
                </Route>
                <Route path={`${path}/tv`} >
                    <Tv/>
                </Route>
                <Route path={`${path}/search`}>
                    <Search/>
                </Route>
                <Route path={`${path}/movies/:movieId`}>
                    <Home/>
                </Route>
            </Switch>
        </>
    );
}
export default MovieRouter;