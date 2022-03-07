import React from 'react'

const Todoitem = (props) => {
    const{
        index,
        value,
        deleteTodo,
        handlesOnClickEdit
    } = props;
    return(
         <div className="row-wrapper">
            <span>{value}</span>
                <button onClick={() => handlesOnClickEdit(index, value)}>edit</button>
                <button onClick={() => deleteTodo(index)}>delete</button>
        </div>
    )
}

export default Todoitem