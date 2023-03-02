import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";
import Modal from "./Modal";
import Search from "./Search";
import add from "../add.png";
import Bulkactionmenu from "./bulkactionmenu.js";
import Checkbox from "./Checkbox";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      show: false,
      currentid: "",
      search: "",
      bulk_drop_down_open: false,
      bulkaction: "",
      bulk_delete_array:[]
    };
  }

  showModal = (id) => {
    this.setState({ show: true, currentid: id });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  async componentDidMount() {
    fetch("http://localhost:8080/api/employees")
      .then((res) => res.json())
      .then((res) => this.setState({ employees: res }));
  }
  edit = (id) => {
    this.props.history.push(`/updateemployee/${id}`);
    document.location.reload();
  };

  ok = (id) => {
    fetch("http://localhost:8080/api/deleteemployee/" + id, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          employees: this.state.employees.filter(
            (employee) => employee.id !== id
          ),
        })
      )
      .then(this.hideModal());
  };
  addEmployee = () => {
    this.props.history.push("/addemployee/ ");
    document.location.reload();
  };
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
  onhandleEdit = () => {
    this.setState({ bulkaction: "edit" });
  };
  onhandleAdd = () => {
    this.setState({ bulkaction: "add" });
  };
  onhandleDelete = () => {
    this.setState({ bulkaction: "delete" });
  };
  checkboxclick=(e)=>{
    //const array=[];
    
    if(e.target.checked==true)
this.setState({bulk_delete_array:[...this.state.bulk_delete_array,{id:e.target.value}]})

  };

  onCancelClick=(e)=>{
    this.setState({bulkaction:""})
    console.log("cancel clicked");
  }

  render() {
    return (
      <div className="emp-content">
        <h2 className="textcenter"> Employee List</h2>
        <tr>
          {this.state.bulkaction!="delete"?
          (
            <>
          <th>
            <span className="addemplopyee">
              <button
                className="add-emp-icon-button"
                onClick={this.addEmployee}
              >
                <input type="image" src={add} /> Add
              </button>
            </span>
          </th>
          <th>
            <span>
              <button
                className="bulk-action"
                onClick={(e) =>
                  this.setState({
                    bulk_drop_down_open: !this.state.bulk_drop_down_open,
                  })
                }
              >
                Bulk actions <div className="triangle_down" />{" "}
              </button>
            </span>
            {this.state.bulk_drop_down_open && (
              <Bulkactionmenu
                onhandleEdit={this.onhandleEdit}
                onhandleAdd={this.onhandleAdd}
                onhandleDelete={this.onhandleDelete}
              />
            )}
          </th></>):
           (<><th>
            <button className="add-emp-icon-button">Delete</button>
           </th>
           <th>
            <button className="bulk-action" onClick={(e)=>this.onCancelClick(e)}>Cancel</button>
           </th></>)}
          <th>
            <div className="search">
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
                <th> Action </th>
              </tr>
            </thead>

            <tbody className="tr">
              {this.filterData().length == 0 ? (
                <h1>No Result Found</h1>
              ) : (
                this.filterData().map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    {this.state.bulkaction=="delete"?(<td><Checkbox id ={employee.id} checkboxclick={(e)=>this.checkboxclick(e)}/></td>):(<td>
                      <button
                        className="updatebutton"
                        onClick={() => this.edit(employee.id)}
                      >
                        Update
                      </button>
                      <button
                        className="deltebutton"
                        onClick={() => this.showModal(employee.id)}
                      >
                        Delete
                      </button>
                    </td>) }
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            handleok={() => this.ok(this.state.currentid)}
            msg={this.state.currentid}
          />
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(ListEmployeeComponent);
