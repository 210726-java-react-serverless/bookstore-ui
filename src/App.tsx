import React, {useState} from "react";

import LoginComponent from "./components/LoginComponent";
import { Principal } from "./dtos/principal";
import {NavbarComponent} from "./components/NavbarComponent";
import {BrowserRouter, Route, Switch} from "react-router-dom"



function App() {
    const [authUser, setAuthUser] = useState(undefined as Principal | undefined);

    return (
        <>
            <BrowserRouter>
                <NavbarComponent currentUser={authUser} setCurrentUser = {setAuthUser}/>
                <Switch>
                <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
                </Switch>
            </BrowserRouter>
        </>
    )
}