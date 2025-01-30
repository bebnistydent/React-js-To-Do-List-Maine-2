import { v1 } from "uuid";
import { FilterValuesType } from "../App";
import { TodolistType } from "../components/Todolist";

//types

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }
} 


export type AddTodolistAT = {
    type: "ADD-TODOLIST",
    payload: {
        title: string
        id: string
    }
}

export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: string,
            title: string,
        }

}

export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: string,
            filter: FilterValuesType,
        },

}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT;

//Create a new state

export const todolistsReducer = (todolist: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolist.filter(tl => tl.id !== action.payload.id)

        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                            id: action.payload.id,
                            title: action.payload.title,
                            filter: "All"
                        }
                return [...todolist, newTodolist] 

        case 'CHANGE-TODOLIST-TITLE': 
          
                return todolist.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} :tl)
                
        case 'CHANGE-TODOLIST-FILTER': 
                return todolist.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} :tl)

        default:
            return todolist
    }


    
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return ({
      type: "REMOVE-TODOLIST",
      payload: {
      id,
      }
    })
}

export const AddTodolistAC = (title: string): AddTodolistAT => {
    return ({
                type: 'ADD-TODOLIST',
                payload: {
                    id: v1(),          // I don't really know what it is but 
                    title,       // it's called 'shorted form'   
                }
    })
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return ({
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title,
        }
    })
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return ({
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter,
        }
    })
}




