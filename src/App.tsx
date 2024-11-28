import React, { useState } from 'react';
import './App.css';
import {TaskStateType, TaskType, Todolist, TodolistType} from './components/Todolist';
import { v1 } from 'uuid';
import { AddItemForum } from './components/AddItemForm';


export type FilterValuesType = "All" | "Active" | "Complited"


function App() {
    
    const todolist_1 = v1();
    const todolist_2 = v1();
     //Business Logic layer
     const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolist_1,
        title: "What to learn",
        filter: "All", 
       
        },
        {
        id: todolist_2, 
        title: "What to buy", 
        filter: "All", 
        
        },
    ])

    const todolistTitle: string = "What to learn"
    
    const [task, setTask] = React.useState<TaskStateType>({
        [todolist_1]: [
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS/TS', isDone: false},
        ],

        [todolist_2]: [
        {id: v1(), title: 'Wiskey', isDone: false},
        {id: v1(), title: 'Cola', isDone: false},
        {id: v1(), title: 'Tequila', isDone: false},
        ],

       
    })
        //task
        const removeTask = (taskId: string, todolistId: string) => {
            setTask({...task, [todolistId]: task [todolistId].filter(t => t.id !== taskId)})

        };


        const addTask = (title: string, todolistId: string) => {
        
            const newTask: TaskType = {
                title: title,
                isDone: false,
                id: v1(),
            }
            
            setTask({...task, [todolistId]: [...task[todolistId], newTask]})
        };



        const setTaskNewStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
            
            
            setTask({...task, [todolistId]: task[todolistId].map(task => task.id === taskId ? {
                ...task, isDone: newStatus} : task)})
        };


        
        //todolist
        const changeTodolistFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
            setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} :tl))
        }







        //GUI Layer
        
        

        

        //This is how you can do it without filter method
        //But please don't
        // const nextState: Array<TaskType> = [] 
        // for(let i = 0; i < task.length; i++) {
        //     if(task[i].id !== taskId) {
        //         nextState.push(task[i])
        //     }
        // }
        // setTask(nextState)


    //     const copyCurrentState = [...task];
    //     let taskIndex;

    //     for( let i = 0; i < copyCurrentState.length; i++) {
    //         if(task[i].id === taskId) {
    //             taskIndex = i
    //         }
    //     }
    //         if(taskIndex !== undefined) {
    //     copyCurrentState.splice(taskIndex, 1);
    //         }
    //     setTask(copyCurrentState)
    
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
        delete task[todolistId]
    }
    

const addTodolis = (title: string) => {
    const todolistID = v1();
    const newTodolist: TodolistType = {
        id: todolistID,
        title: title,
        filter: "All"
    }
    setTodolist([...todolist, newTodolist])
    setTask({...task, [todolistID]: []})
}

const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, title} :tl))
}


    //User Interface
    return (
        <div className="App">
            <AddItemForum addItem={addTodolis}/>

        {todolist.map(tl => {

let filteredTask: Array<TaskType> = task[tl.id]
        
if(tl.filter === "Active") {
    filteredTask = filteredTask.filter(task => task.isDone === false)
}

if(tl.filter === "Complited") {
    filteredTask = filteredTask.filter(task => task.isDone === true)
}
            return (
                <Todolist 
                todolistId = {tl.id}
                title = {tl.title} 
                tasks = {filteredTask}
                filter={tl.filter} 
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                setTaskNewStatus={setTaskNewStatus}
                removeTodolist={removeTodolist}
                changeTodolistTitle = {changeTodolistTitle}  />
            )
        })}

           
            
              
        </div>
    );

    }
export default App;
