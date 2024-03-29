import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";
import Modal from "./Modal";
import Search from "./Search";
import add from "../add.png";
import Bulkactionmenu from "./bulkactionmenu.js";
import Checkbox from "./Checkbox";
import fileDownload from 'js-file-download'
import Spinner from "./spinner";

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
      bulk_delete_array: [],
      isdiable: true,
     dropDownArrow:"triangle_up",
     backgroupdblur:"",
     no_data:"",
     isLoding:false
    };
  }

  showModal = (id) => {
    this.setState({ show: true, currentid: id , backgroupdblur: "blur"});

  };
  hideModal = () => {
    this.setState({ show: false ,backgroupdblur:""});
  };

  async componentDidMount() {
        fetch("http://localhost:8080/api/employees",{
          headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
        })
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
      .then((res) =>{
        this.setState({
          employees: this.state.employees.filter(
            (employee) => employee.id !== id
          ),
        })
        console.log(res);
      }
      )
      .then(this.hideModal());
  };
  addEmployee = () => {
    this.props.history.push("/addemployee/ ");
    document.location.reload();
  };
  getFilterValue = (e) => {
    const search = e.target.value;
   // const matches = search.match(/\d+/g)
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
 
 
  onbulkActionMenuClick = (e) => {
    this.setState({ bulkaction: e.target.value });
    if(e.target.value=='edit')
    {
      this.props.history.push("/bulkeditemployee");
      document.location.reload();
      
    }
    if(e.target.value=='add'){
      this.props.history.push("/bulkadd");
      document.location.reload();
    }
  };
  checkboxclick = (e) => {
    //const array=[];
    this.setState({ isdiable: false });
    if (e.target.checked == true) {
      this.setState({
        bulk_delete_array: [
          ...this.state.bulk_delete_array,
          parseInt(e.target.value),
        ],
        isdiable: false,
      });
    } else {
      let selectedId = [...this.state.bulk_delete_array];
      selectedId = selectedId.filter((item) => item != e.target.value);
      this.setState({ bulk_delete_array: [...selectedId] });
      {
        selectedId.length > 0
          ? this.setState({ isdiable: false })
          : this.setState({ isdiable: true });
      }
    }
  };

  onCancelClick = (e) => {
    this.setState({ bulkaction: "", isdiable: true });

    console.log("cancel clicked");
  };

  onbulkDeleteClick = (e) => {
    console.log(JSON.stringify(this.state.bulk_delete_array));
    fetch("http://localhost:8080/api/deletemultipleemployee", {
      method: "POST",

      body: JSON.stringify(this.state.bulk_delete_array),
      headers: {
        "Content-Type": "application/json",
       
      },
    }).then((res) => {
     // console.log(res);
      document.location.reload();
    
    });
  };
  
   downloadCsv = () => {
    fetch("http://localhost:8080/api/csvdownload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(true),
    })
      .then((res) => res.json())
      .then((res) => {
       console.log(res);
       fileDownload(res.message, "EmployeeManagment.csv")

      });
   
  };

  render() {
    return (
      <div>
           
      <div className={this.state.backgroupdblur}>
      <div className="emp-content">
        <h2 className="textcenter"> Employee List</h2>
        <tr>
          {this.state.bulkaction != "delete" ? (
            <>
              <th>
                <span className="addemplopyee">
                  <button
                    className="add-emp-icon-button"
                    onClick={this.addEmployee}
                  >
                    <input type="image" src={add} /> 
                    Add
                  </button>
                </span>
              </th>
              <th>
              <Bulkactionmenu
                    onbulkActionMenuClick={this.onbulkActionMenuClick}
                    value={this.state.bulkaction}
                  />
              </th>
            </>
          ) : (
            <>
              <th>
                <button
                  className="bulkdelete"
                  onClick={(e) => this.onbulkDeleteClick(e)}
                  disabled={this.state.isdiable}
                >
                  Delete
                </button>
              </th>
              <th>
                <button
                  className="bulkdeleteCancel"
                  onClick={(e) => this.onCancelClick(e)}
                >
                  Cancel
                </button>
              </th>
            </>
          )}
          <th>
            <div className={this.state.bulkaction =="delete"? "search-bulk":"search"}>
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
            <tr>
            <td colspan="3"><h1>No Result Found</h1></td>
         </tr>
              ) : (
                this.filterData().map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    {this.state.bulkaction == "delete" ? (
                      <td>
                        <Checkbox
                          id={employee.id}
                          checkboxclick={(e) => this.checkboxclick(e)}
                        />
                      </td>
                    ) : (
                      <td>
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
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div>
          <div>
    </div>
    </div>
        </div>
        <button className="csvdownload" onClick={this.downloadCsv}>Download CSV</button>
      </div>
      </div>
      <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            handleok={() => this.ok(this.state.currentid)}
            msg={<p>Do you want to delete this id {this.state.currentid} ?</p>}
            cancellabel="Cancel"
            oklabel="Ok"
            dialogueHeader=" Conformation"
          />
        
      </div>
    );
  }
}

export default withRouter(ListEmployeeComponent);
