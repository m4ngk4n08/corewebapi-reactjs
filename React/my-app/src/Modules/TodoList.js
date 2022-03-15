import React, {useState} from 'react'
import Todoitem from './Todoitem';

export default function Todolist(){
    const [todos, setTodo] = useState({
        todo: '',
        todolist: []
    })

    const[edit, setEdit] = useState({
        editTodo: '',
        editIndex: ''
    })

    const[isUpdate, setIsUpdate] = useState(false)

    const {todo, todolist} = todos;
    const {editTodo, editIndex} = edit;

    function handleOnChange(e){
        const{name, value} = e.target;

        setTodo({...todos, [name]: value})
    }

    function handleOnChangeUpdate(e){
        const{name, value} = e.target;

        setEdit({...edit, [name]: value})
    }
    function handlesOnClickEdit(index, value){
        setIsUpdate(true)

        setEdit({editTodo: value, editIndex: index})
    }
    function handlesOnClickCancel(e){
        setIsUpdate(false)
    }

    /* CREATE */
    function createTodo(){
        let list = todolist;
        list.push(todo);

        setTodo({todo: '', todolist: list})
    }

    /* DELETE */
    function deleteTodo(index){
        const list = todolist;
        list.splice(index, 1)

        setTodo({todo: '', todolist: list})
    }

    /* UPDATE */
    function updateTodo(index){
        const list = todolist;
        list[index] = editTodo;

        setTodo({...todos, todolist: list})
        setIsUpdate(false)
        setEdit({editTodo: '', editIndex: ''})
    }

    return(
        <div className="todolist-main">
            <div className="form-wrapper">
                <input 
                type="text" 
                name="todo"
                placeholder="Create Todolist"
                value={todo}
                onChange={handleOnChange} />
                <button onClick={createTodo}>Add</button>
            </div>
            <div className="table-main">
                <div className="header-wrapper">
                    <span>To do</span>
                    <span>Action</span>
                </div>
                {
                    todolist.length ?
                         todolist.map((value, index) => (
                         <Todoitem 
                            key={index}
                            index={index}
                            value={value}
                            deleteTodo={deleteTodo}
                            handlesOnClickEdit={handlesOnClickEdit}
                         />
                         
                         )) : <span>No record found</span>
                }
                {
                    isUpdate ?
                        <div className="form-wrapper2">
                            <span>Index: {editIndex}</span>
                            <input
                            type="text"
                            name="editTodo"
                            placeholder="Update todo"
                            value={editTodo}
                            onChange={handleOnChangeUpdate}
                            />
                            <button onClick={() => updateTodo(editIndex)}>Update</button>
                            <button onClick={handlesOnClickCancel}>Cancel</button>
                        </div> : ''
                }
                    
            </div>
        </div>
    )
}