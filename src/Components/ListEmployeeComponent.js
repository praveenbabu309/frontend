import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import Modal from './Modal';

class ListEmployeeComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            employees:[],
            show: false
        }
    }

    showModal = (id) => {
        this.setState({ show: true });
      };
      hideModal = () => {
        this.setState({ show: false });
      };

   async componentDidMount(){
            fetch('http://localhost:8080/api/employees')
            .then(res=>res.json())
            .then(res =>this.setState({employees : res}))
    }
edit=(id)=>{
    this.props.history.push(`/addemployee/${id}`);
    document.location.reload();
}

ok=(id)=>{
    fetch('http://localhost:8080/api/deleteemployee/'+id,{
        method:'POST'})
    .then(res=>res.json())
    .then(res=>this.setState({employees : this.state.employees.filter(employee=>employee.id!==id)})).then(this.hideModal());
}
    addEmployee=()=>{
        this.props.history.push("/addemployee/-1");
        document.location.reload();
    }
    render() {
        return (
            <div>
                <h2 className='textcenter'> Employee List</h2>
                <div>
                    <button className='addemplopyee' onClick={this.addEmployee}>Add Employee</button>
                </div>
                <br></br>
                <div>
                    <table className='table'>
                        <thead className='thead'>
                            <tr >
                               <th> Employee ID     </th>
                               <th> Employee Name  </th> 
                               <th> Action     </th>
                            </tr>
                        </thead>
                        <tbody className='tr'>
                            {
                            this.state.employees.map(
                                employee =>
                                <tr key ={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>
                                        <button  className='updatebutton' onClick={()=>this.edit(employee.id)}>Update</button>
                                        <Modal show={this.state.show} handleClose={this.hideModal} handleok={()=>this.ok(employee.id)}></Modal>
                                        <button className='deltebutton' onClick={()=>this.showModal(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            )

                            }
    
                        </tbody>
                    </table>
                    
                </div>
            </div>
        );
    }
}

export default withRouter( ListEmployeeComponent);