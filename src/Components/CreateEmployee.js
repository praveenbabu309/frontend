import React, { Component } from "react";
import "../App.css";
import Modal from "./Modal";

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      mode: "",
      disabled: false,
      show: false,
      message: "",
    };
  }
  componentDidMount() {
    if (!this.state.id) {
      this.setState({ mode: "add", id: "" });
    } else {
      this.setState({ disabled: true });
      fetch("http://localhost:8080/api/employees/" + this.state.id)
        .then((res) => res.json())
        .then((res) => this.setState({ id: res.id, name: res.name }));
      //.then(res =>this.setState({id : res.id,name:res.name}))
    }
  }
  onchange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  save = (event) => {
    event.preventDefault();
    
    if (this.state.mode == "add") {
      const employee = { id: this.state.id, name: this.state.name };
      fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == "CONFLICT") {
            this.setState({
              show: true,
              message: ` ${res.id} is already presented`,
            });
          } else {
            this.props.history.push("/employees");
            document.location.reload();
          }
        });
    } else {
      const employee = { id: this.state.id, name: this.state.name };
      fetch("http://localhost:8080/api/updateemployees/" + this.state.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }).then((res) => {
        this.props.history.push("/employees");
       // document.location.reload();
      });
    }
  };
  cancel = () => {
    this.props.history.push("/employees");
    document.location.reload();
  };
  getTitle() {
    if (this.state.mode == "add") {
      return "Add Employees";
    } else {
      return "Update Employee";
    }
  }
  ok = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <div>
        <br />
        <div className="table">
          <h1 className="thead">{this.getTitle()}</h1>
          <div>
            <h3>Employee ID</h3>
            <input
              type="number"
              placeholder="Id"
              name="id"
              value={this.state.id}
              onChange={this.onchange}
              disabled={this.state.disabled}
            ></input>
            <h3>Employee Name</h3>
            <input
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onchange}
            ></input>
          </div>
          <br />
          <button className="updatebutton" onClick={this.save}>
            Save
          </button>
          <button className="deltebutton" onClick={this.cancel}>
            Cancel
          </button>
        </div>
        <Modal
          show={this.state.show}
          handleClose={this.ok}
          //handleok= {this.ok}
          msg={this.state.message}
          cancellabel="OK"
          hideleftbutton='hidden'
          dialogueHeader=" Error"
        />
      </div>
    );
  }
}

export default CreateEmployee;
