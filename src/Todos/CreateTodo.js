import React, { useRef, useState } from 'react';
import addIcon from './../images/add_black_24dp.svg'
import { useAddTodos, useCurrentTodo, useEdit, useEditToggle, useNewTodo, useSetCurrentTodo, useSetNewTodo, useTodos } from '../Contexts/TodoContext';
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebase/firebase';
import { doc, setDoc } from "firebase/firestore"; 

export function CreateTodo() {
    const setNewTodo = useSetNewTodo()
    const newTodo = useNewTodo()
    const formInputRef = useRef()
    const setTodos = useAddTodos()
    const todos = useTodos()
    const editMode = useEdit()
    const setEditMode = useEditToggle()
    const currentTodo = useCurrentTodo()
    const setCurrentTodo = useSetCurrentTodo()

    async function handleSubmit(e) {
        if (newTodo === '') return

        const documentId = uuidv4()
        const addedTodo = { todo: newTodo, id: documentId }
        setTodos([...todos, addedTodo ])

        try {
          const user = localStorage.getItem('user')
          await setDoc(doc(db, user, documentId), addedTodo);
          setNewTodo('')
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    async function handleSave(e) {
      e.preventDefault()
      const updatedTodo = { todo: newTodo, id: currentTodo.id }
      
      const updatedTodos = todos.slice().map(todo => {
        if (currentTodo.id === todo.id) {
          return updatedTodo
        } else {
          return todo
        }
      })
      
      try {
        const user = localStorage.getItem('user')
        await setDoc(doc(db, user, currentTodo.id), updatedTodo);

        setTodos(updatedTodos)
        setEditMode(false)
        setNewTodo('')
        setCurrentTodo(null)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

  return (
    <>
      <form className='min-w-15%'>
        <div className="input-group mb-4">
          <label htmlFor='todo' aria-label='todo' className='text-4xl mb-4 font-bold'>{editMode ? 'Edit Todo' : 'New Todo'}</label>
          <div className="flex flex-col relative items-center w-full md:flex-row">
            <input data-testid='todo-input' placeholder={editMode ? 'Edit Todo...' : 'New Todo...'} className='input' ref={formInputRef} name='todo' type="text" value={newTodo} onChange={e => {setNewTodo(e.target.value)}}/>
            {!editMode && <span className='hint--bottom icon add-icon shrink-0 absolute right-8 bottom-1'  aria-label="Add"> <img src={addIcon} alt="Add icon" onClick={handleSubmit} /> </span>}
            { editMode && <button className='btn' onClick={handleSave}>Save</button> }
            { editMode && <button className='btn btn-gray' onClick={e => {setEditMode(false); setNewTodo('')}}>Cancel</button> }
          </div>
        </div>
      </form>
      <h3 className="font-semibold text-2xl mb-2">Todos</h3>
      </>
  )
}
