import './App.css';
import React,{useState} from 'react';
import {Home} from './Modules/Home';
import {Department} from './Modules/Department';
import {Employee} from './Modules/Employee';
import {Navigation} from './Modules/Navigation';
import TodoList from './Modules/TodoList';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
  <div className="container">
    <h3 className ="m-3 d-flex justify-content-center">Hello I'm using React!</h3>
     <Router>
      <Navigation />
        <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/department' element={<Department/>} />
              <Route path='/employee' element={<Employee/>} />
              <Route path='/todolist' element={<TodoList />}/>
        </Routes>
    </Router> 
    
  </div>  
  );
}

export default App;
