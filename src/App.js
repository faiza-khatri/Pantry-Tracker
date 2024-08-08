import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import UserProvider


import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import LogOut from './LogOut';
import FetchDB from "./FetchDB";
import HomePage from "./HomePage";

// App.js

function App() {
  
  const data = FetchDB();

  //creating the signup logic


  return (

    <Router>
      <UserProvider>
        <div className="App">
          {/* <NavBar /> */}
          <div className="content">
              <Switch>
                <Route exact path="/">
                  <SignIn />
                </Route>
                <Route exact path="/signUp">
                  <SignUp />
                </Route>
                <Route exact path="/homePage">
                  <HomePage />
                </Route>
              </Switch>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;