import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expands="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/department">
                        Department
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                        Employee
                    </NavLink>
                    <a className="d-inline p-2 bg-dark text-white" href="https://github.com/ArtOfEngineer/ReactJsCoreApi">GitLink</a>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/bentumbling">
                        Bentumbling
                    </NavLink>

                    <NavLink className="d-inline p-2 bg-dark text-white" to="/todolist">
                        Todo-list
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
