import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Home() {
    const history = useNavigate();
    const handleOnCLick = () =>{
        history('/todolist')
    }

    return (
        <div className="home-main">
            <h1>Welcome to Home</h1>
            <button onClick={handleOnCLick}>Click me</button>
        </div>
    )
}