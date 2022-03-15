import { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';



export class Department extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false};
        this._isMounted = true;
        
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            if(this._isMounted){
                this.setState({deps:data});
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

    deleteDep(depid){
        if(window.confirm("Are you sure?"))
        {
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render(){
        const {deps, depid, depname} = this.state; 
        let addModalClose=()=>this.setState({addModalShow:false});   
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" variant="dark" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map((dep)=>(
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={() => {
                                            this.setState( { 
                                                editModalShow:true,
                                                depid:dep.DepartmentId, 
                                                depname:dep.DepartmentName
                                            })
                                        }}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={() => this.deleteDep(dep.DepartmentId)}>
                                            Delete
                                        </Button>

                                        <EditDepartmentModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname}/>
                                    </ButtonToolbar>
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
                            Add Department
                        </Button>

                        <AddDepartmentModal show={this.state.addModalShow} onHide={addModalClose}/>
                    </ButtonToolbar>
            </div>
        )
    }
}