import react,{Component} from 'react';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export class Container extends Component{
  return() {
    <div className="container">
        <h3 className ="m-3 d-flex justify-content-center">Hello I'm using React!</h3>
        
     <Router>
      <Navigation />
        <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/department' element={<Department/>} />
              <Route path='/employee' element={<Employee/>} />
        </Routes>
    </Router> 
    
    </div>  
}
}
