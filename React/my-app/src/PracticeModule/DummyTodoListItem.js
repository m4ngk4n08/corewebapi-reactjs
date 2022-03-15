import React from 'react'

const DummyTodoListItem = (props) => {
    const{
        index,
        value,
        isEditHandler,
        onDeleteHandler
    } = props;

    return (
        <div className='row-wrapper'>
            <span>{value}</span>
            <button onClick={() => isEditHandler(value, index)}>Edit</button>
            <button onClick={() => onDeleteHandler(index)}>Delete</button>
        </div>
    )
}

export default DummyTodoListItem;