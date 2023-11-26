import React,{Component} from 'react';
import { Table, Spinner } from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component{
    constructor(props){
        super(props)
        this.state = {emps:[], addModalShow:false, editModalShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API +'employee')
            .then(response=>response.json())
            .then(data=>{
                this.setState({emps:data});
            });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are You sure?'))
            fetch(process.env.REACT_APP_API + 'employee/' + empid,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
        })
    }

    render(){
        const {emps, empid, empname,depmt, photofilename, doj} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                {emps.length > 0 ? (
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>Doj</th>
                        <th>Options</th>
                    </tr>
               </thead>
               <tbody>
                {emps.map(emp=>
                    <tr key={emp.EmployeeId}>
                        <td>{emp.EmployeeId}</td>
                        <td>{emp.EmployeeName}</td>
                        <td>{emp.Department}</td>
                        <td>{emp.DateOfJoining}</td>
                        <td>
                        <ButtonToolbar>
                            <Button className='me-2 !important' variant="info" onClick={()=>this.setState({editModalShow:true,
                                 empid:emp.EmployeeId, empname:emp.EmployeeName, depmp:emp.Department,
                                 photofilename:emp.photofilename, dog:emp.DateOfJoining})}>Edit</Button>
                            <Button className='me-2 !important' variant="danger" onClick={()=>this.deleteEmp(emp.EmployeeId)}>Delete</Button>
                        </ButtonToolbar>
                        </td>
                        </tr>)}
               </tbody>
            </Table>
             ) : (
            <div><Spinner></Spinner><p>Loading...</p></div>
           )}
           <ButtonToolbar><Button varient='primary' onClick={()=>this.setState({addModalShow:true})}>
                Add Employee</Button>
                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}/>
                <EditEmpModal show={this.state.editModalShow} onHide={editModalClose} 
                empid={empid} empname={empname} depmt={depmt} photofilename={photofilename} doj={doj}/>
            </ButtonToolbar>
        </div>
        )
    }
}