import React from 'react';
import './TaskForm.css';

const TaskForm = (props) => {
    return (
        <div id='taskFormDiv' >
            <p onClick={props.toggleTaskForm} id='closeFormBtn' >X</p>
            <form onSubmit={props.addTask} method='POST' id='taskForm'>
                <label for='tname' className='txtLabels'>Task Name:</label>
                <input type='text' id='tname' placeholder='Save the world' required></input>
                <label for='tdesc' className='txtLabels'>Description:</label>
                <textarea id='tdesc' placeholder='(optional)'></textarea>
                <button type='submit' id='addTaskBtn'>Add!</button>
            </form>
        </div>
    );
};

export default TaskForm;