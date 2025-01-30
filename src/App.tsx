import React, { useReducer, useState } from 'react';
import './App.css';
import {TaskStateType, TaskType, Todolist, TodolistType} from './components/Todolist';
import { v1 } from 'uuid';
import { AddItemForum } from './components/AddItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Container, CssBaseline, Grid2, Paper, Switch } from '@mui/material';
import { MenuButton } from './components/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { amber, green } from '@mui/material/colors';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from './model/tasks-reducer';
import { AddTask } from '@mui/icons-material';
 


export type FilterValuesType = "All" | "Active" | "Completed"


function App() {
    
    const todolist_1 = v1();
    const todolist_2 = v1();

    //Business Logic layer
    
    //  const [todolist, setTodolist] = useState<Array<TodolistType>>([
    //     {id: todolist_1,
    //     title: "What to learn",
    //     filter: "All", 
       
    //     },
    //     {
    //     id: todolist_2, 
    //     title: "What to buy", 
    //     filter: "All", 
        
    //     },
    // ]);

    const [todolist, dispatchTodolist] = useReducer(todolistsReducer, [
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
    console.log(todolist)

    
    
    // const [task, setTask] = React.useState<TaskStateType>({
    //     [todolist_1]: [
    //     {id: v1(), title: 'HTML', isDone: false},
    //     {id: v1(), title: 'CSS', isDone: false},
    //     {id: v1(), title: 'JS/TS', isDone: false},
    //     ],

    //     [todolist_2]: [
    //     {id: v1(), title: 'Wiskey', isDone: false},
    //     {id: v1(), title: 'Cola', isDone: false},
    //     {id: v1(), title: 'Tequila', isDone: false},
    //     ],

       
    // })

    const [task, dispatchTask] = useReducer(tasksReducer, {
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

    const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light')


        //task
        const removeTask = (taskId: string, todolistId: string) => {
            // setTask({...task, [todolistId]: task [todolistId].filter(t => t.id !== taskId)})
            dispatchTask(RemoveTaskAC({id: taskId, todolistId: todolistId}))

        };

        const addTask = (title: string, todolistId: string) => {
        
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: title,
            //     isDone: false,
            // }
            
            //setTask({...task, [todolistId]: [...task[todolistId], newTask]})
            dispatchTask(AddTaskAC({title: title, todolistId: todolistId}))
        };

        const setTaskNewStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
            // setTask({...task, [todolistId]: task[todolistId].map(task => task.id === taskId ? {
            //     ...task, isDone: newStatus} : task)})
            dispatchTask(ChangeTaskStatusAC({id: taskId, isDone: newStatus, todolistId: todolistId }))
        };

        const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
            // setTask({...task, [todolistId]: task[todolistId].map(task => task.id === taskId ? {
            //     ...task, title: title} : task)})
            dispatchTask(ChangeTaskTitleAC({id: taskId, title: title, todolistId: todolistId}))
        };







        //todolist
        
        const addTodolis = (title: string) => {
            // const todolistID = v1();
            // const newTodolist: TodolistType = {
            //     id: todolistID,
            //     title: title,
            //     filter: "All"
            // }
            // setTodolist([...todolist, newTodolist])
            // setTask({...task, [todolistID]: []})
            const action = AddTodolistAC(title)
            dispatchTodolist(action)
            dispatchTask(action)
        }
        
        const removeTodolist = (todolistId: string) => {
            // setTodolist(todolist.filter(tl => tl.id !== todolistId))
            // delete task[todolistId]
            const action = RemoveTodolistAC(todolistId)
            dispatchTodolist(action)
            dispatchTask(action)
        }
        
        const changeTodolistTitle = (title: string, todolistId: string) => {
            //setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, title} :tl))
            dispatchTodolist(ChangeTodolistTitleAC(title, todolistId))
        }
        
        const changeTodolistFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
            //setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} :tl))
            //dispatchTodolist(ChangeTodolistFilterAC(todolistId, newFilterValue))
              dispatchTodolist({type: 'CHANGE-TODOLIST-FILTER', payload: {filter:newFilterValue, id: todolistId}})

        }
        
    //User Interface
     const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: green,
            secondary: amber,
        }
     })


    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">

    <AppBar position="static">
         <Toolbar sx = {{display: "flex", justifyContent: "space-between"}}>
           <IconButton color="inherit">
             <MenuIcon />
           </IconButton>

        <Box>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.secondary.dark}>Faq</MenuButton>
          <Switch onChange={()=>{
            setThemeMode(themeMode === "dark" ? "light" : "dark")
          }} />
        </Box>

        </Toolbar>
      </AppBar>
      <Container fixed>

        <Grid2 container sx = {{padding: "15px 0px"}}>
    <AddItemForum addItem={addTodolis}/>
    </Grid2> 

    <Grid2 container spacing={4}>

        {todolist.map(tl => {

let filteredTask: Array<TaskType> = task[tl.id]
        
if(tl.filter === "Active") {
    filteredTask = filteredTask.filter(task => task.isDone === false)
}

if(tl.filter === "Completed") {
    filteredTask = filteredTask.filter(task => task.isDone === true)
}



            return (
                <Grid2 key = {tl.id}>
                <Paper  
                elevation={8} 
                sx = {{padding: "15px", 
                       backgroundColor: "rgb(191, 27, 251)",
                       border: "2px solid darkgrey"}}
                       > 
                <Todolist
                key={tl.id} 
                todolistId = {tl.id}
                title = {tl.title} 
                tasks = {filteredTask}
                filter={tl.filter} 
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                setTaskNewStatus={setTaskNewStatus}
                removeTodolist={removeTodolist}
                changeTodolistTitle = {changeTodolistTitle}
                changeTaskTitle={changeTaskTitle}  />
                </Paper>
                </Grid2>
            )
        })}

           
</Grid2>     
</Container>  

        </div>
        </ThemeProvider>
    );

    }
export default App;
