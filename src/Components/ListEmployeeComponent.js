import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class ListEmployeeComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            employees:[]
        }
    }


   async componentDidMount(){
            fetch('http://localhost:8080/api/employees')
            .then(res=>res.json())
            .then(res =>this.setState({employees : res}))
    }

    addEmployee=()=>{
        this.props.history.push("/addemployee");
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
                        <thead >
                            <tr >
                               <th> Employee ID     </th>
                               <th> Employee Name  </th> 
                               <th> Action     </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.employees.map(
                                employee =>
                                <tr key ={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
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