
import { v1 } from "uuid";
import { TaskStateType, TaskType } from "../components/Todolist";
import {  AddTodolistAC, RemoveTodolistAT  } from "./todolists-reducer";

type AddTaskAT = ReturnType<typeof AddTaskAC>;
type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>;
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>;
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>;
type AddTodolistAT = ReturnType<typeof AddTodolistAC>



type ActionType = AddTaskAT | RemoveTaskAT | 
ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT 


export const tasksReducer = (tasks: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":{
            const {title, todolistId} = action.payload;
            const newTask: TaskType = {
                            id: v1(),
                            title: title,
                            isDone: false,
                        };

            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        
        case "REMOVE-TASK": {
        const {id, todolistId} = action.payload;
        return {...tasks, [todolistId]: tasks [todolistId].filter(t => t.id !== id)}
           
        }

        case "CHANGE-TASK-STATUS": {
            const {id, isDone, todolistId} = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ? {
                ...task, isDone} : task)}
        }

        case "CHANGE-TASK-TITLE": {
            const {id, title, todolistId} = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ? {
                ...task, title} : task)}
        }

        case "ADD-TODOLIST": {
            const {id} = action.payload;
            return {...tasks, [id]: []}

        }

        case "REMOVE-TODOLIST": {
            const {id} = action.payload;
            delete tasks[id]
            return {...tasks}
        }

        default:
            return tasks
    }
}

//actions creators

export const AddTaskAC = (payload: {title: string, todolistId: string}) => {
    return ({
        type: "ADD-TASK",
        payload: payload,
    } as const)
}

//removeTaskAC('2', 'todolistId2')

export const RemoveTaskAC = (payload: {id: string, todolistId: string}) => {
    return({
        type: 'REMOVE-TASK',
        payload: payload,
    }as const)
}


export const ChangeTaskStatusAC = (payload: {id: string, isDone: boolean, todolistId: string}) => {
    return ({
    type: "CHANGE-TASK-STATUS",
    payload,
    } as const)
}


export const ChangeTaskTitleAC = (payload: {id: string, title: string, todolistId: string}) => {
    return ({
    type: "CHANGE-TASK-TITLE",
    payload,
    } as const)
}