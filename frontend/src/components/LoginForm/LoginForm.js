import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import classes from './LoginForm.module.css';
import BaseURL from '../../helpers/tools';
import { Link } from "react-router-dom";

class LoginForm extends Component{
    state = {
        email: "",
        password: "",
        success: false,
        message: ""
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        axios.post(`${BaseURL()}users/auth`, data, config)
            .then(response => {
                this.setState({ message: 'Login successfull!' });
                this.setState({ success: true });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            })
            .catch(error => {
                this.setState({ success: false });
                this.setState({ message: 'Login failed! ' + error.response.data.msg});
            });

        event.preventDefault();
    }

    render()
    {
        if(!this.state.success) {
            return (
                <div className={classes.UserInfo}>
                    <div className={classes.LoginTitle}> Welcome! </div>

                    <form className={classes.Form} onSubmit={this.handleSubmit}>
                        <div className={classes.FormGroup} >
                            <label>Email</label>
                            <input type="text" name="email" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.FormGroup}>
                            <label>Password</label>
                            <input type="password" name="password" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.ErrorMessage}>
                            {this.state.message}
                        </div>
                        <button type="submit" >Login</button>
                        <div className={classes.RegisterQuestion}>
                            <Link className={classes.Link} to={"/register"}> Not having an account yet? Register. </Link>
                        </div>
                    </form>
                </div>
            );
        } else {
            console.log("here");
            return (
                <div className={classes.SuccessMessage}>
                    <Redirect to={{ pathname: '/dashboard' }} />
                </div>
            )
        }
    }
}

export default LoginForm;