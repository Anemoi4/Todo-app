import React from 'react';
import { useEditToggle, useSetNewTodo, useSetCurrentTodo, useAddTodos, useTodos } from '../Contexts/TodoContext';
import penSVG from './../images/edit_black_24dp.svg'
import trashSVG from './../images/delete_black_24dp.svg'
import { db } from '../firebase/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { ReactHint } from '..';

export default function Todo({ todo }) {
    const setEditMode = useEditToggle()
    const setCurrentTodo = useSetCurrentTodo()
    const setNewTodo = useSetNewTodo()
    const setTodos = useAddTodos()
    const todos = useTodos()

    function handleEdit(e) {
      setEditMode(true)
      setCurrentTodo(todo)
      setNewTodo(todo.todo)
    }

    async function handleDelete(e) {
      const filteredTodos = todos.filter(currentTodo => {
        return todo.id !== currentTodo.id
      })
      setTodos(filteredTodos)

      const user = localStorage.getItem('user')
      try {
        await deleteDoc(doc(db, user, todo.id))
      } catch (error) {
        console.log('Error deleting a doc', error)
      }
    }

  return (
      <li className='todo'>
        <p className='font-semibold ml-2'>{todo.todo}</p>
        <div className="icons relative p-0">
          <span className='icon hint--bottom' aria-label="Edit">
            <img src={penSVG} alt="Edit todo" className='icon' onClick={handleEdit}/>
          </span>
          <span className='icon hint--bottom' aria-label="Delete">
            <img src={trashSVG} alt="Delete todo" className='icon' onClick={handleDelete}/>
          </span>
        </div>
      </li>
  );
}
