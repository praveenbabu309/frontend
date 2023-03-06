import React, { Component } from 'react';
import Search from './Search';
//import '../App.css';

class Bulkedit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          employees: [],
          search: "",
          disabled: true
        };
      }
      componentDidMount() {
        fetch("http://localhost:8080/api/employees")
          .then((res) => res.json())
          .then((res) => this.setState({ employees: res }));
      }
      getFilterValue = (e) => {
        const search = e.target.value;
        //const matches = search.match(/\d+/g)
        if (search == "") {
          this.setState({ no_data: false });
        }
        this.setState({ search: e.target.value });
      };
      
  filterData() {
    return this.state.employees.filter((employee) => {
      if (this.state.search == "") {
        return employee;
      } else if (
        employee.id
          .toString()
          .toLowerCase()
          .includes(this.state.search.toString().toLowerCase()) ||
        employee.name.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return employee;
      }
    });
  }
  cancel=(e)=>{
    this.props.history.push('/');
    document.location.reload();
  }
  Bulkedit=(e,employeeid) =>{
    this.setState({disabled:false});
    const updated_array = this.state.employees.map(obj => {
        
        if (obj.id == employeeid) {
         obj.name=  e.target.value;
        }
        return obj;
       })

    this.setState({ employees:updated_array})
    console.log(this.state.employees);
  }
  save=(e)=>{
    fetch("http://localhost:8080/api/bulkedit", {
      method: "POST",

      body: JSON.stringify(this.state.employees),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      this.props.history.push("/");
      document.location.reload();
    });
  }
   

    render() {
        return (
            <div className="emp-content">
                <h2 className="textcenter"> Employee List</h2>
                <tr>
                   <th><button onClick={(e)=>this.save()} className='bulkdelete' disabled={this.state.disabled}>Save</button></th> 
                   <th> <button onClick={(e)=>this.cancel()} className='bulkdeleteCancel' >Cancel</button></th> 
                   <th>
            <div className="search-bulk">
              <Search
                search={this.state.search}
                getFilterValue={this.getFilterValue}
              />
            </div>
          </th>
                </tr>
                <div>
                     <table className="table">
            <thead className="thead">
              <tr>
                <th> Employee ID </th>
                <th> Employee Name </th>
              </tr>
            </thead>

            <tbody className="tr">
              {this.filterData().length == 0 ? (
                <tr>
                <h1>No Result Found</h1></tr>
              ) : (
                this.filterData().map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td className='inputWidth'><input type="text" className='inputWidth' name='name' value={employee.name} onChange={(e)=>this.Bulkedit(e,employee.id)}/></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
                </div>
            </div>
        );
    }
}

export default Bulkedit;