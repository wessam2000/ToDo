import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { toggleSubtask } from '../../model/Store';
import styles from './styles.module.css';

const Task = ({ task, index }) => {
    const dispatch = useDispatch();

    const handleToggleSubtask = (subtaskIndex) => {
        dispatch(toggleSubtask({ taskId: task.id, subtaskIndex }));
    };

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                        padding: '10px',
                        backgroundColor:"rgba(210, 195, 195, 0.407)",
                        marginBottom: '8px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 3px rgb(0,0,0)',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ fontSize: '20px' }}>{task.title}</span>
                    {task.type === 'text' ? (
                        <p>{task.content}</p>
                    ) : (
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            {task.content.map((subtask, subtaskIndex) => (
                                <li key={subtaskIndex} style={{ listStyle: 'none', marginBottom: '5px' }}>
                                    <input
                                        type="checkbox"
                                        checked={subtask.completed}
                                        onChange={() => handleToggleSubtask(subtaskIndex)}
                                        aria-checked={subtask.completed}
                                        
                                    />
                                    <span style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>
                                        {subtask.content}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default Task;
