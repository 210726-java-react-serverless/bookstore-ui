import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';

import {Principal} from "./dtos/principal";
import DashboardComponent from "./components/DashboardComponent";
import LoginComponent from "./components/LoginComponent";

import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from "./components/RegisterComponent";
import {ConfirmSignupComponent} from "./components/ConfirmSignupComponent";
import {Amplify} from "aws-amplify";
import {COGNITO} from "./config/aws";

Amplify.configure({
    aws_cognito_region: COGNITO.REGION,
    aws_user_pools_id: COGNITO.USER_POOL_ID,
    aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID
})

function App() {

    let [currentUser, setCurrentUser] = useState(undefined as Principal | undefined);

    return (
      <BrowserRouter>
        <NavbarComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Switch>
            <Route exact path="/dashboard" render={() => <DashboardComponent currentUser={currentUser} /> } />
            <Route path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } />
            <Route path="/confirmation" render={() => <ConfirmSignupComponent /> } />
        </Switch>
      </BrowserRouter>
);
}

export default App;
