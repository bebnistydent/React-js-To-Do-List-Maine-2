import {AddTodolistAC, RemoveTodolistAC, todolistsReducer, ChangeTodolistFilterAC, ChangeTodolistTitleAC} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from '../components/Todolist'
 


test('correct todolist should be deleted', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
 
  // 1. Стартовый state
  const startState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
  ]
 
  // 2. Действие(action)
  const action = RemoveTodolistAC(todolistId1)
  
  const endState = todolistsReducer(startState, action)
 
  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})



test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
   
    const startState: TodolistType[] = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
   

    const newTodoTitle = "New Todolist"
    const endState = todolistsReducer(startState, AddTodolistAC("New Todolist"))
   
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoTitle)
  })



  test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
   
    const startState: TodolistType[] = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
   
    const newTodolist = "New Todolist"
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolist))
   
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolist)
  })



  test('correct filter to todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
   
    const startState: TodolistType[] = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
   

    const newFilter = 'Completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter))
   
    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
  })


