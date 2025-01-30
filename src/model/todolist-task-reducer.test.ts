import { TaskStateType, TodolistType } from "../components/Todolist"
import { tasksReducer } from "./tasks-reducer"
import { AddTodolistAC, todolistsReducer } from "./todolists-reducer"


test('ids should be equal', ()=> {
    const startTaskState: TaskStateType = {}
    const startTodolistState: TodolistType[] = []

    const action = AddTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTask).toBe(action.payload.id)
    expect(idFromTodolist).toBe(action.payload.id)
})