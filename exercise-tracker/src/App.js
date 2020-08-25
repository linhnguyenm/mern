import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";

import "bootstrap/dist/css/bootstrap.min.css"

const isLoggedIn = function(){
  return localStorage.getItem('TOKEN_KEY') != null;
};

const SecuredRoute = ({ component: Component, ...rest }) => (
    
    <Route
      {...rest}
      render={props =>
      
        isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
function App() {
  return (
    <Router>
      <div className="container">
      {isLoggedIn() && (
              <>
              <Navbar />
              </>
            )}
        
        <br/>
        <SecuredRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" exact component={Login}/>
        <SecuredRoute path="/" exact component={ExercisesList}/>
        <SecuredRoute path="/edit/:id" exact component={EditExercise}/>
        <SecuredRoute path="/create" exact component={CreateExercise}/>
        <SecuredRoute path="/user" exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
