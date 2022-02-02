import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid'

const TodoContext = React.createContext()
const TodoAddContext = React.createContext()
const EditContext = React.createContext()
const EditToggleContext = React.createContext()
const CurrentTodoContext = React.createContext()
const SetCurrentTodoContext = React.createContext()
const NewTodoContext = React.createContext()
const SetNewTodoContext = React.createContext()

export function useTodos() {
    return useContext(TodoContext)
}

export function useAddTodos() {
    return useContext(TodoAddContext)
}

export function useEdit() {
    return useContext(EditContext)
}

export function useEditToggle() {
    return useContext(EditToggleContext)
}

export function useCurrentTodo() {
    return useContext(CurrentTodoContext)
}

export function useSetCurrentTodo() {
    return useContext(SetCurrentTodoContext)
}

export function useNewTodo() {
    return useContext(NewTodoContext)
}

export function useSetNewTodo() {
    return useContext(SetNewTodoContext)
}

export function TodosProvider({ children }) {
    const [todos, setTodos] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentTodo, setCurrentTodo] = useState(null)
    const [newTodo, setNewTodo] = useState('')

    async function getCollection(user) {
        try {
            const querySnapshot = await getDocs(collection(db, user));
            let todoList = [];
            querySnapshot.forEach((doc) => {
                let todo = doc.data()
                todoList.push(todo)
            });
            setTodos(todoList)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        // Check if there is existing user
        const user = localStorage.getItem('user')
        if (!user) {
            const id = uuidv4()
            localStorage.setItem('user', id)
            setTodos([])
        } else {
            getCollection(user)
        }
    }, [])

  return(
        <TodoContext.Provider value={todos}>
            <TodoAddContext.Provider value={setTodos}>
                <EditContext.Provider value={editMode}>
                    <EditToggleContext.Provider value={setEditMode}>
                        <CurrentTodoContext.Provider value={currentTodo}>
                            <SetCurrentTodoContext.Provider value={setCurrentTodo}>
                                <NewTodoContext.Provider value={newTodo}>
                                    <SetNewTodoContext.Provider value={setNewTodo}>
                                        {children}
                                    </SetNewTodoContext.Provider>
                                </NewTodoContext.Provider>
                            </SetCurrentTodoContext.Provider>
                        </CurrentTodoContext.Provider>
                    </EditToggleContext.Provider>
                </EditContext.Provider>
            </TodoAddContext.Provider>
        </TodoContext.Provider>
    )
}
