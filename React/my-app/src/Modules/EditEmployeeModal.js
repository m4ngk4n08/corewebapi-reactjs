import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditEmployeeModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename="capture2.png";
    imagesrc=process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data})
        });

    }

   handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            console.log(event.target.EmployeeName.value)
            console.log(event.target.Department.value)
            console.log(event.target.DateOfJoining.value)
            console.log(this.photofilename)
            console.log("success")
        },
        (error)=>{
            alert('Failed');
            console.log(event.target.EmployeeName.value)
            console.log(event.target.Department.value)
            console.log(event.target.DateOfJoining.value)
            console.log(this.photofilename)
            console.log("err")
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        const date = new Date(this.props.doj);
        const futureDate = date.getDate() + 3;
        date.setDate(futureDate);
        const defaultValue1 = date.toLocaleDateString('en-CA');            
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeId">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control 
                                        type="Text" 
                                        name="EmployeeId" 
                                        disabled 
                                        placeholder="Employee ID" 
                                        defaultValue={this.props.empid}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control 
                                        type="Text" 
                                        name="EmployeeName" 
                                        required 
                                        placeholder="Employee Name" 
                                        defaultValue={this.props.empname}></Form.Control>
                                    </Form.Group>

                                     <Form.Group controlId="Department">
                                        <Form.Label>department</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.depmt}>
                                            {this.state.deps.map(dep=>
                                                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Date Of Joining</Form.Label>
                                        <Form.Control
                                            defaultValue={defaultValue1}
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="Date Of Joining">
                                        </Form.Control>
                                    </Form.Group>
                                    <br/>
                                    
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Update Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Image width="200px" height="200px" src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                                <input onChange={this.handleFileSelected} type="File"/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}