import type {Task, TasksState} from '../app/AppWithRedux.tsx'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

//экшены для redux toolKit (RTK)
export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTaskAC')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTaskAC')
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/changeTaskStatusAC')
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/changeTaskTitleAC')

const initialState: TasksState = {}

//reducer для redux toolKit (RTK)
export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})


// reducer по-старому для redux
// export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
//   switch (action.type) {
//     case 'delete_task': {
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
//       }
//     }
//     case 'create_task': {
//       const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
//       return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
//     }
//     case "change_task_status": {
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
//       }
//     }
//     case "change_task_title": {
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
//       }
//     }
//     case "create_todolist": {
//       return {...state, [action.payload.id]: []}
//     }
//     case "delete_todolist": {
//       const newState = {...state}
//       delete newState[action.payload.id]
//       return newState
//     }
//     default:
//       return state
//   }
// }


// экшены по-старому для redux
// export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
//     return {type: 'delete_task', payload} as const
// }
//
// export const createTaskAC = (payload: { todolistId: string, title: string }) => {
//     return {type: 'create_task', payload} as const
// }
//
// export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
//     return {type: 'change_task_status', payload} as const
// }
//
// export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
//     return {type: 'change_task_title', payload} as const
// }


// по-старому для redux, для TRK они не нужны
// export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
// export type CreateTaskAction = ReturnType<typeof createTaskAC>
// export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
//
// type Actions =
//     | DeleteTaskAction
//     | CreateTaskAction
//     | ChangeTaskStatusAction
//     | ChangeTaskTitleAction
//     | CreateTodolistAction
//     | DeleteTodolistAction
