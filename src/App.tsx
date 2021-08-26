import React, { useState } from 'react';
import logo from './logo.svg';
import { Principal } from './dtos/principal';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {NavbarComponent} from './components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined)

  return (
    <>
      <Router>
        <NavbarComponent currentUser={authUser} setCurrentUser={setAuthUser}/>
        <Switch>
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
