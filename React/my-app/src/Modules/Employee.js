import react,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmployeeModal} from './AddEmployeeModal';
import {EditEmployeeModal} from './EditEmployeeModal';

export class Employee extends Component{
    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
        this._isMounted = true;
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            if(this._isMounted){
                this.setState({emps:data});
            }
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    deleteEmp(empid){
        if(window.confirm("Are you sure?"))
        {
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render(){
        const {emps, empid, empname, depmt, photofilename, doj} = this.state; 
        let addModalClose=()=>this.setState({addModalShow:false});   
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" variant="dark" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map((emp)=>(
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={() => {
                                            this.setState( { 
                                                editModalShow:true,
                                                empid:emp.EmployeeId, 
                                                empname:emp.EmployeeName,
                                                depmt:emp.Department,
                                                photofilename:emp.PhotoFileName,
                                                doj:emp.DateOfJoining
                                            })
                                        }}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={() => this.deleteEmp(emp.EmployeeId)}>
                                            Delete
                                        </Button>

                                    </ButtonToolbar>
                                        <EditEmployeeModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            depmt={depmt}
                                            photofilename={photofilename}
                                            doj={doj}
                                            />
                                 </td>
                            </tr>))}
                    </tbody>
                </Table>
                    <ButtonToolbar>
                        <Button onClick = {() => 
                            this.setState( { 
                                addModalShow:true
                                })} 
                            variant="dark">
                            Add Employee
                        </Button>

                        <AddEmployeeModal show={this.state.addModalShow} onHide={addModalClose}/>
                    </ButtonToolbar>
            </div>
        )
    }
}