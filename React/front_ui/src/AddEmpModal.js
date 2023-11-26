import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, ModalTitle, Image} from 'react-bootstrap'



export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state ={deps:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected =  this.handleFileSelected.bind(this);
    }
    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

componentDidMount(){
    fetch(process.env.REACT_APP_API+'department')
    .then(response=>response.json())
    .then(data=>{
        this.setState({deps:data})
    });
}
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            EmployeeId:null,
            EmployeeName:event.target.EmployeeName.value,
            Department:event.target.Department.value,
            DateOfJoining:event.target.DateOfJoining.value,
            PhotoFileName:this.photofilename
            })
        })
        .then(res => res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('faild');
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        const formData = new FormData();
        const imagedata = event.target?.files[0];
        this.photofilename = event.target.files[0]?.name;
        formData.append(
            "myFile",
            imagedata,
            imagedata.name
            // event.target.files[0],
            // event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'Employee/SaveFile',{
            method:'POST',
            body:formData,
        })
        .then(res=> res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH + result;
        },
        (error)=>{
            alert('image upload faild');
        })
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton >
                        <ModalTitle id="contained-modal-title-vcenter">Add Employee</ModalTitle>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="EmployeeName">
                                            <Form.Label>EmployeeName</Form.Label>
                                                <Form.Control type='text' name='EmployeeName' required 
                                                placeholder='EmployeeName'/>
                                        </Form.Group>

                                        <Form.Group controlId="Department">
                                            <Form.Label>Department</Form.Label>
                                                <Form.Control as="select">
                                                    {this.state.deps.map(dep =><option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                                </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="DateOfJoin">
                                            <Form.Label>DateOfJoin</Form.Label>
                                                <Form.Control type="date" name="DateOfJoin" required placeholder='01-01-2022'/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Button variant='primary' type='submit'>
                                                Add Employee</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col sm={6}>
                                    <Image width="200px" height="200px" src={this.imagesrc}/>
                                    <input onChange={this.handleFileSelected} type='file'></input>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </div>
        )
    }
}