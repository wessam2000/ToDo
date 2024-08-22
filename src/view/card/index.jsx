import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';
import styles from './styles.module.css';

const getBackgroundColor = (columnId) => {
    switch (columnId) {
        case 'todo':
            return 'rgb(255, 209, 73)';
        case 'doing':
            return 'rgb(251, 96, 96)';
        case 'done':
            return 'rgb(54, 253, 88)'; 
        default:
            return 'white'; 
    }
};

const Card = ({ columnId, tasks }) => (
    <div className={styles.main} style={{ backgroundColor: getBackgroundColor(columnId) ,
     marginBottom: '8px', borderRadius: '4px',
      boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
       width: "30%",textAlign: 'center',padding: '10px',height : "auto"}}>
        <h3>{columnId.toUpperCase()}</h3>
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.task}
                >
                    {tasks.map((task, index) => (
                        <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

export default Card;
