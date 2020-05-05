import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import classes from './RegisterForm.module.css';
import BaseURL from '../../helpers/tools';

class RegisterForm extends Component{
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber 
        }
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        axios.post(`${BaseURL()}users/register`, data, config)
            .then(response => {
                this.setState({ success: true });
                this.setState({ message: 'Registration successfull!' });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            })
            .catch(error => {
                this.setState({ success: false });
                this.setState({ message: 'Registration failed! ' + error.response.data.msg});
            });

        event.preventDefault();
    }

    render()
    {
        if(!this.state.success) {
            return (
                <div className={classes.UserInfo}>
                    <div className={classes.RegistrationTitle}> Registration </div>
                    <form className={classes.Form} onSubmit={this.handleSubmit}>
                        <div className={classes.FormGroup} >
                            <label>Email</label>
                            <input type="text" name="email" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.FormGroup}>
                            <label>Password</label>
                            <input type="password" name="password" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.FormGroup}>
                            <label>First Name</label>
                            <input type="text" name="firstName" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.FormGroup}>
                            <label>Last Name</label>
                            <input type="text" name="lastName"  required onChange={this.handleChange} />
                        </div>
                        <div className={classes.FormGroup}>
                            <label>Phone Number</label>
                            <input type="text" name="phoneNumber" required onChange={this.handleChange} />
                        </div>
                        <div className={classes.ErrorMessage}>
                            {this.state.message}
                        </div>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className={classes.SuccessMessage}>
                    <Redirect to={{ pathname: '/dashboard' }} />
                </div>
            )
        }
    }
}

export default RegisterForm;