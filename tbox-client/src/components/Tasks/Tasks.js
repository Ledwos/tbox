import React, { useState, useEffect } from 'react';
import addBtn from './Plus_button_small.png';
import TaskForm from '../TaskForm/TaskForm';
import fetch from 'node-fetch';

const Tasks = (props) => {
    // const [uid, setuid] = useState('0');
    const [tasks, settasks] = useState([]);
    const [tform, settform] = useState(false);
    const [tdesc, settdesc] = useState('');

    useEffect(() => {
        getTasks();
    }, [props.uid])

    // fetch tasks 
    const getTasks = () => {
        fetch(`db/tasks/${props.uid}`)
        .then(res => res.json())
        .then(data => {
            data = data.sort((a, b) => parseFloat(a.t_id) - parseFloat(b.t_id));
            settasks(data);
        });
    };

    const toggleTaskForm = () => {
        settform(!tform)
    };

    //  add task
    const addTask = (e) => {
        e.preventDefault();
        const uid = props.uid;
        const task = document.getElementById('tname').value;
        const desc = document.getElementById('tdesc').value;
        fetch('/db/nutask', {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": uid,
                "task": task,
                "desc": desc,
            })
        })
        .then(response => {
            if (response.status === 200) {
                document.querySelector('#taskForm').reset();
                toggleTaskForm();
                getTasks();
            } else {
                console.log(`error: ${response.status}`)
            }
        })
    };

    //  set task as complete
    const compTask = (e) => {
        let tId = e.target.id;
        // console.log(`you checked task- ${tId}`);
        fetch('/db/comp', {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tid": tId,
            })
        })
        .then(response => {
            if (response.status === 200) {
                console.log('task updated!')
            } else if (response.status === 500) {
                console.log(`error: ${response.status}`)
            }
        });
    };

    // update task desc
    const updateDesc = (e) => {
        let tid = e.target.id;
        let tid2 = 'desc' + tid;
        // console.log(tid2);
        let desc = document.getElementById(tid).innerHTML;
        settdesc(desc);


        // create close button- no bueno
        // let closeBtn = document.createElement('button')
        // closeBtn.innerHTML='X'
        // closeBtn.setAttribute('onClick', 'resDesc');
        // closeBtn.onClick = resDesc();
        // closeBtn.addEventListener('onclick', resDesc(), false);
        // create update button
        
        // create textbox
        let editBox = document.createElement('textarea');
        editBox.setAttribute('id', `${tid}`);
        editBox.innerHTML = desc;
        document.getElementById(tid).innerHTML = '';
    
        // put it all together
        document.getElementById(tid2).appendChild(editBox);
        // document.getElementById(tid2).appendChild(closeBtn);
    };

    // closeBtn function to restore desc
    const resDesc = () => {
        console.log('restore desc!');
    };

    return (
        <div>
            <p>I'm the task comp. Your id is- {props.uid}</p>
            <div>
                {tasks.length > 0 ? [
                    tasks.map(task => (
                    <div key={task.t_id} className='task'>
                        <div className='taskHeader'>
                            <h4 className='taskTitle'>{task.t_name}</h4>
                        </div>
                        <div className='taskDesc' id={task.t_id} onClick={updateDesc}>
                            {task.t_desc}
                        </div>
                        <div id={`desc${task.t_id}`}></div>
                        <input type='checkbox' onClick={compTask} id={task.t_id} defaultChecked={task.t_comp}></input>
                        <br />
                    </div>
                    ))] : <p>No tasks set</p>
                }
            </div>
            {tform  ? <TaskForm toggleTaskForm={toggleTaskForm} addTask={addTask}/> : <img onClick={toggleTaskForm} src={addBtn}></img> }
        </div>
    );
};

export default Tasks;