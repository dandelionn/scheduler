import React from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegisterForm from './components/RegisterForm/RegisterForm'
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (<Router>
      <div className={classes.App}>
            <div className={classes.Navbar}>
                <Link className={classes.Link} to={"/login"}> Login </Link>
                <Link className={classes.Link} to={"/register"}> Register </Link>
            </div>
            <Switch>
              <Route exact path='/' component={LoginForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
            </Switch>
      </div>
    </Router>
  );
}

export default App;
