import React, {Component} from 'react';
import { Link } from "react-router-dom";
import classes from "./Controlbar.module.css";

class Controlbar extends Component{
    render(){
        const isAuthenticated = localStorage.getItem('accessToken');
       
        if (!isAuthenticated) {
            return (
                <div className={classes.Controlbar}>
                    <Link className={classes.Link} to={"/login"}> Login </Link>
                    <Link className={classes.Link} to={"/register"}> Register </Link>
                </div>
            );
        }
        else {
            return (<div className={classes.Controlbar}>
                <button className={classes.AccountButton}>Account</button>
                <button className={classes.LogoutButton}>Logout</button>
            </div>);
        }
    }
}

export default Controlbar;