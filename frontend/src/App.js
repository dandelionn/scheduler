import React from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterForm from './components/RegisterForm/RegisterForm'
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (<Router>
      <div className={classes.App}>
            <Switch>
              <Route exact path='/' component={LoginForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
            </Switch>
      </div>
    </Router>
  );
}

export default App;
