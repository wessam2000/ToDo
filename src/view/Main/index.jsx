import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { addTask, moveTask } from '../../model/Store';
import Card from '../card';
import styles from './styles.module.css';

const Main = () => {
    const tasks = useSelector((state) => state.todo.tasks);
    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState('text');
    const [title, setTitle] = useState('');
    const [newSubtask, setNewSubtask] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [content, setContent] = useState('');

    const handleAddTask = () => {
        if (title.trim()) {
            if (taskType === 'task') {
                console.log('Subtasks:', subtasks);
                dispatch(addTask({ title, type: 'task', content: subtasks }));
            } else if (taskType === 'text') {
                console.log('Content:', content); // Debug: Log content before dispatching
                dispatch(addTask({ title, type: 'text', content }));
            }
            setTitle('');
            setContent('');
            setSubtasks([]);
        }
    };
    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            setSubtasks([...subtasks, { content: newSubtask, completed: false }]);
            setNewSubtask('');
        }
    };
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        dispatch(moveTask({ source, destination }));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>To-Do App</h1>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    
                >
                    <option value="text">Text</option>
                    <option value="task">Task </option>
                </select>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className={styles.inputT}
                />

                {taskType === 'text' ? (
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content..."
                        className={styles.inputT}
                    />
                ) : (
                    <>
                        <input
                            type="text"
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                            placeholder="Add a new subtask..."
                            className={styles.inputT}
                        />
                        <button onClick={handleAddSubtask} className={styles.button}>
                            Add Subtask
                        </button>
                    </>
                )}

                <button onClick={handleAddTask} className={styles.button}>
                    Add {taskType === 'text' ? 'Text' : 'Task'}
                </button>
            </div>

            {taskType === 'task' && (
                <ul style={{ backgroundColor: 'lightgray' ,width: '25%', padding: '10px 30px',marginLeft: '60px', borderRadius: '4px', boxShadow: '0 2px 3px rgba(0,0,0,0.2)'}}>
                    {subtasks.map((subtask, index) => (
                        <li key={index}>{subtask.content}</li>
                    ))}
                </ul>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {Object.keys(tasks).map((columnId) => (
                        <Card key={columnId} columnId={columnId} tasks={tasks[columnId]} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};


export default Main;
