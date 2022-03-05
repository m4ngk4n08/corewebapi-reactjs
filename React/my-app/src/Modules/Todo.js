import React from 'react'

export default function Todo({ todos, setTodos, toggletodo }) {

function handleTodoClick(id){
    toggletodo(todos.id)
}

function toggletodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  return (
    todos.map(todo => {
        return (
            <div key={todo.id} toggletodo={toggletodo}>
                <label>
                    <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                        {todo.name
                }</label>
            </div>
        )
    })
  )
}
