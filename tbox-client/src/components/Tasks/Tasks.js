import React, { useState, useEffect } from 'react';
import addBtn from './Plus_button_small.png';
import TaskForm from '../TaskForm/TaskForm';
import fetch from 'node-fetch';
import './Taskcss.css';

const Tasks = (props) => {
    // const [uid, setuid] = useState('0');
    const [tasks, settasks] = useState([]);
    const [tform, settform] = useState(false);
    // const [tdesc, settdesc] = useState('');

    useEffect(() => {
        getTasks();
    }, [props.uid])

    // fetch tasks 
    const getTasks = () => {
        fetch(`db/tasks/${props.uid}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                data = data.sort((a, b) => parseFloat(a.t_id) - parseFloat(b.t_id));
                settasks(data);
            }
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
        let tno = tid.slice(4);
        let desc = document.getElementById(tid).innerHTML;
        // settdesc(desc);

        // create textbox
        let editBox = document.createElement('textarea');
        editBox.setAttribute('id', `${tid}`);
        editBox.setAttribute('class', 'updateBox');
        editBox.innerHTML = desc;
        editBox.addEventListener('keyup', (e) => {setDesc(e, desc)});
        document.getElementById(tid).remove();
    
        // prepend textarea to div
        document.getElementById(`tbody${tno}`).prepend(editBox);
    };

    // closeBtn function to restore desc
    const setDesc = (e, txt) => {
        let tid = e.target.id;
        let tno = tid.slice(4);
        let newDesc = e.target.value;
        let ndesc = txt;
        // console.log(ndesc);
        let updatedDesc = document.createElement('p');
        updatedDesc.setAttribute('class', 'taskDesc');
        updatedDesc.setAttribute('id', `${e.target.id}`);
        updatedDesc.onclick = (e) => {updateDesc(e)};
        if (e.keyCode === 13) {
            // submit on Enter
            e.preventDefault();
            console.log('posting!');
            fetch('/db/desc', {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "tid": tno,
                    "desc": newDesc,
                })
            })
            .then(response => {
                if (response.status === 200) {
                    updatedDesc.innerHTML = newDesc;
                    document.getElementById(`${e.target.id}`).remove();
                    document.getElementById(`tbody${tno}`).prepend(updatedDesc);
                    // getTasks();
                } else {
                    console.log(`error: ${response.status}`)
                }
            })
        } else if (e.keyCode === 27) {
            // return to original on Esc
            e.preventDefault();
            console.log(ndesc);
            updatedDesc.innerHTML = ndesc;
            document.getElementById(`${e.target.id}`).remove();
            document.getElementById(`tbody${tno}`).prepend(updatedDesc);
            // settdesc('');
        };
    };

    return (
        <div id='taskComp'>
            <h1 id='pageTitle' onClick={props.dashPage} >Tasks</h1>
            <div id='taskDiv'>
                {tasks.length > 0 ? [
                    tasks.map(task => (
                    <div key={`t${task.t_id}`} className='task' id={`task${task.t_id}`}>
                        <div className='taskText'>
                        <div className='taskHeader'>
                            <h4 className='taskTitle'>{task.t_name}</h4>
                        </div>
                            <div id={`tbody${task.t_id}`}>
                                <p className='taskDesc' id={`desc${task.t_id}`} onClick={(e) => {updateDesc(e)}}>
                                    {task.t_desc}
                                </p>
                            </div>
                            <div className='taskLine' ></div>
                        </div>
                        <label className='taskcheckLabel'>
                            <input type='checkbox' onClick={compTask} id={task.t_id} defaultChecked={task.t_comp} ></input>
                            <span class='taskcheckMark'></span>
                        </label>
                    </div>
                    ))] : <p>No tasks set</p>
                }
                {tform  ? <TaskForm toggleTaskForm={toggleTaskForm} addTask={addTask}/> : <img onClick={toggleTaskForm} src={addBtn} id='formBtn'></img> }
            </div>
        </div>
    );
};

export default Tasks;