import React, {Component} from 'react';
import classes from './Dashboard.module.css';
import BaseURL from '../../helpers/tools';
import Controlbar from '../Controlbar/Controlbar';
import Task from '../Task/Task';

class Dashboard extends Component {
    state = {
    }

    render()
    {
        return (
            <div className={classes.Dashboard}>
                <div className={classes.Controlbar}><Controlbar /></div>
                <div className={classes.TasksTitle}>Tasks</div>
                <div className={classes.SectionsTitle}>Sections</div>
                <div className={classes.IdeasTitle}>Ideas</div>
                <div className={classes.Tasks}>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </div>
                <div className={classes.Sections}>
                    <ul>
                        <li>testdasd</li>
                        <li>testss</li>
                        <li>testdad</li>
                        <li>test</li>
                        <li>testssssssss</li>
                        <li>testdasdsa</li>
                        <li>testd</li>
                        <li>testdada</li>
                        <li>testdad</li>
                        <li>testda</li>
                    </ul>
                </div>
                <div className={classes.Ideas}></div>
 
            </div>
        );
    }
}

export default Dashboard;
