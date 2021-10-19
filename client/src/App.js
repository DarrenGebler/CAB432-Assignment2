import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import Error from "./containers/Error";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                </Switch>
                {/*<Switch>*/}
                {/*    <Route path="/*" component={Error}/>*/}
                {/*</Switch>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
