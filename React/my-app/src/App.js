import './App.css';
import React from 'react';
import Home from './Modules/Home';
import {Department} from './Modules/Department';
import {Employee} from './Modules/Employee';
import {Navigation} from './Modules/Navigation';
import Bentumbling  from './Modules/Bentumbling';
import Todolist from './Modules/Todolist';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DummyTodoList from './PracticeModule/DummyTodoList';

function App() {

  return (
  <div className="app-main">
    <Router>
      <Navigation />
        <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/department' element={<Department/>} />
              <Route path='/employee' element={<Employee/>} />
              <Route path='/bentumbling' element={<Bentumbling/>} />
              <Route path='/todolist' element={<Todolist /> } />
              <Route path='/dummytodolist' element={<DummyTodoList />} />
        </Routes>
    </Router> 
  </div>  
  );
}

export default App;
