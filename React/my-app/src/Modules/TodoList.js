import React, { useState, useRef, useEffect } from 'react'
import Todo from './Todo'



export default function TodoList() {
  const LOCAL_STORAGE_KEY = 'todoApp.todos'
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(()=> {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
}, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, {id: Math.random(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <Todo todos={todos} />

      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Complete Todo</button>
      <div>0 left todo</div>
    </>
  )
}
