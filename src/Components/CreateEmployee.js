import React, { Component } from 'react';
import '../App.css';

class CreateEmployee extends Component {
    constructor(props)
    {
        super(props)
        this.state={
           id:'',
           name:''
        }
    }
    onchange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
      save=(event)=>{
            event.preventDefault();
            const employee ={id : this.state.id,name : this.state.name};
            fetch('http://localhost:8080/api/employees',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(employee)
            }).then(res=>{
                this.props.history.push('/');
                document.location.reload();
            });
      }
      cancel=()=>{
                 this.props.history.push('./');
                 document.location.reload();
      }
    render() {
        return (
         
            <div >
                <br/>
                <div className='table'>
                <h1>Add Employees</h1>
                 <div >
                    <h3>Employee ID</h3>
                    <input type="text" placeholder="Id" name="id" value={this.state.id} onChange={this.onchange}></input>
                    <h3>Employee Name</h3>
                    <input placeholder="Name" name="name" value={this.state.name} onChange={this.onchange}></input>
                    </div>
                    <br/>
                 <button className='submit' onClick={this.save}>Submit</button>
                 <button className='cancel' onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default CreateEmployee;