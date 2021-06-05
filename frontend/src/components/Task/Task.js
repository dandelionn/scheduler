import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import classes from './Task.module.css';
import BaseURL from '../../helpers/tools';

class Task extends Component{
    state = {
        tag: "#tag",
        description: "some text",
        resources : []
    }

    render()
    {
        return (
            <div className={classes.Task}>
                <div className={classes.Tag}>
                    {this.state.tag}           
                </div>
                <div className={classes.Description}>
                    {this.state.description}
                </div>
                <div className={classes.Resources}>
                    {this.state.Resources}
                </div>
            </div>
        );
    }
}

export default Task;