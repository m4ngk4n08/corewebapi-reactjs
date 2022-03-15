import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'

const DummyTodoList = () => {

    const[todos, setTodo] = useState({
        todo: '',
        todoList: []
    })

    const[edit, setEdit] = useState({
        todoEdit: uuidv4(),
        todoEditIndex:''
    })

    const[selects, setSelect] = useState({
        initialItems: [{
            id: uuidv4(),
            defaultValue:''
        }]
    })

    const[isEdit, setIsEdit] = useState(false)

    const{todoEdit, todoEditIndex} = edit;
    const{todo, todoList} = todos;
    const{initialItems} = selects;

    function onChangeHandler(e){
        const{name, value} = e.target;

        setTodo({...todos, [name]: value})
    }

    function onChangeEditHandler(e){
        const{name, value} = e.target;

        setEdit({...edit, [name]: value})
    }
    function onCreateTodoHandler(){
        let list = todoList;

        list.push(todo)

        setTodo({todo: '', todoList: list })
    }

    function onSubmitEditHandler(index){
        let list = todoList;
        list[index] = todoEdit;

        setTodo({...todos, todoList: list})
        setIsEdit(false)
    }

    function onDeleteHandler(index){
        let list = todoList;
        list.splice(index, 1)

        setTodo({...todos, todoList: list})
    }

    function isEditHandler(value, index){
        setEdit({todoEdit: value, todoEditIndex: index})
        setIsEdit(true);
    }

    function onCancelEditHandler(){
        setIsEdit(false);
    }

    function onSelectCreateHandler() {
        let newItem = { id: uuidv4(), defaultValue: '' }

        setSelect({initialItems: [...initialItems, newItem]})

        console.log(initialItems)
    }

    const onChangeSelectHandler = (e, index) => {
        let list = initialItems

        list[index] = {
            id: e.key,
            defaultValue: e.value
        }

        setSelect({initialItems: list})
    }

    function onRemoveSelectHandler(selectIndex) {
        let list = initialItems
        list.splice(selectIndex, 1)
        
        setSelect({initialItems: list})

        console.log(list)
    }

    return(
        <div className="todolist-main">
            <Form.Group>
            {
                initialItems.map((initialItemsVal, selectIndex ) => (
                    <div className='form-wrapper' key={initialItemsVal.id}>
                        <Select
                            name={initialItemsVal}
                            defaultValue={initialItemsVal.defaultValue}
                            onChange={(e) => onChangeSelectHandler(e, selectIndex)}
                            options={
                                todoList.map((value, index) => {
                                    return {
                                        label: value,
                                        value: value,
                                        key: initialItemsVal.id
                                    }
                                })
                            }
                            />
                        <Button 
                            variant="danger" 
                            onClick={() => onRemoveSelectHandler(selectIndex)}>
                                Delete
                        </Button>   
                    </div>
                ))
            }
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit"
                onClick={onSelectCreateHandler}>
                    Add Question
            </Button> 
            <div className="form-wrapper">
                <input 
                name="todo"
                placeholder='set todo'
                value={todo}
                onChange={onChangeHandler}
                />
            <button onClick={onCreateTodoHandler}>Submit</button>
            </div>
            <div className='table-main'>
                <div className='header-wrapper'>
                    <span>To do</span>
                    <span>Action</span>
                </div>
                {
                    todoList.length ? 
                    todoList.map((value, index) => (

                        <div className='row-wrapper' key={index}>
                            <span>{value}</span>
                            <button onClick={() => isEditHandler(value, index)}>Edit</button>
                            <button onClick={() => onDeleteHandler(index)}>Delete</button>
                        </div>
                        // <DummyTodoListItem 
                        //     key={index}
                        //     index={index}
                        //     value={value}
                        //     isEditHandler={isEditHandler}
                        //     onDeleteHandler={onDeleteHandler}
                        // />
                    ))
                    : <span>Todo list is empty.</span>
                }
                {
                    isEdit ? 
                        <div className="form-wrapper">
                            <input 
                            name="todoEdit"
                            value={todoEdit}
                            onChange={onChangeEditHandler}
                            />
                            <button onClick={() => onSubmitEditHandler(todoEditIndex)}>Submit</button>
                            <button onClick={onCancelEditHandler}>Cancel</button>
                        </div>
                        : ""
                }
            </div>
        
        </div>
    )
}



export default DummyTodoList;