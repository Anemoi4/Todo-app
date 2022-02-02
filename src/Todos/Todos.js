import React from 'react';
import { useTodos } from '../Contexts/TodoContext';
import Todo from './Todo';

export default function Todos() {
    const todos = useTodos()
  
  if (todos) {
    if (todos.length !== 0) {
      return (
          <div className='container'>
              <ul className='todos'>
                  {todos.map(todo => {
                    return <Todo key={todo.id} todo={todo}/>
                  })}
              </ul>
          </div>
      )
    } else {
      return (
        <div className="container">
            <h3 className="text-4xl font-bold">No todos left, brilliant!</h3>
        </div>
      )
      
    }
  } else {
    <div className="loading">
      Loading...
    </div>
  }
}
