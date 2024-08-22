import { createSlice, configureStore } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    tasks: {
        todo: [],
        doing: [],
        done: [],
    },
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { title, content, type } = action.payload;
            const newTask = {
                id: v4(),
                title,
                type,
                content: type === 'text' ? content : [...content],
            };
            console.log('New Task:', newTask);
            state.tasks.todo.push(newTask);
        },
        moveTask: (state, action) => {
            const { source, destination } = action.payload;

            if (!destination) return;

            if (source.droppableId === destination.droppableId && source.index === destination.index) return;

            if (source.droppableId === destination.droppableId) {
                const column = state.tasks[source.droppableId];
                const [movedTask] = column.splice(source.index, 1);
                column.splice(destination.index, 0, movedTask);
            } else {
                const sourceColumn = state.tasks[source.droppableId];
                const destinationColumn = state.tasks[destination.droppableId];
                const [movedTask] = sourceColumn.splice(source.index, 1);
                destinationColumn.splice(destination.index, 0, movedTask);
            }
        },
        toggleSubtask: (state, action) => {
            const { taskId, subtaskIndex } = action.payload;
            const task = Object.values(state.tasks).flat().find((task) => task.id === taskId);
            if (task && task.type === 'task') {
                task.content[subtaskIndex].completed = !task.content[subtaskIndex].completed;
            }
        },
    },
});

export const { addTask, moveTask, toggleSubtask } = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    },
});
