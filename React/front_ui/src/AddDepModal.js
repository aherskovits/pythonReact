import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, ModalTitle} from 'react-bootstrap'


export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkDepartmentExists = this.checkDepartmentExists.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({addModalShow: false });
        // let addModalClose=()=>this.setState({addModalShow:false});
      }

    checkDepartmentExists(departmentName) {
        // Make a GET request to the server to retrieve the list of departments
        return fetch(process.env.REACT_APP_API + 'department')
          .then(response => response.json())
          .then(data => {
            // Check if the department name already exists in the list of departments
            return data.some(department => department.DepartmentName === departmentName);
          });
      }


    handleSubmit(event) {
        event.preventDefault();
        const departmentName = event.target.DepartmentName.value;
        const regex = /^[A-Z]/;
        if (!regex.test(departmentName)) {
            alert('Input must start with a capital letter!');
        }
        else{    
        this.checkDepartmentExists(departmentName)
          .then(data => {
            if (!data) {
              fetch(process.env.REACT_APP_API + 'department', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  DepartmentId: null,
                  DepartmentName: departmentName
                })
              })
              .then(res => res.json())
              .then((result) => {
                alert(result);
                this.handleClose();
              },
              (error) => {
                alert('failed');
              });
            } else {
              alert(`Department ${departmentName} already exists.`);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
    // handleSubmit(event){
    //     event.preventDefault();
    //     fetch(process.env.REACT_APP_API + 'department',{
    //         method:'POST',
    //         headers:{
    //             'Accept':'application/json',
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //         DepartmentId:null,
    //         DepartmentName:event.target.DepartmentName.value
    //         })
    //     })
    //     .then(res => res.json())
    //     .then((resolt)=>{
    //         alert(resolt);
    //     },
    //     (error)=>{
    //         alert('faild');
    //     })
       
    // }
    render(){
        return(
            <div className="container">
                <Modal {...this.props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton >
                        <ModalTitle id="contained=modal-title-vcenter">Add Department</ModalTitle>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="DepartmentName">
                                            <Form.Label>DepartmentName</Form.Label>
                                                <Form.Control type='text' name='DepartmentName' required 
                                                placeholder='DepartmentName'/>
                                        </Form.Group>
                                        
                                        <Form.Group>
                                            <Button variant='primary' type='submit'>
                                                Add Department</Button>
                                        </Form.Group>
                                    </Form>
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