import React, { Component } from 'react';
import add from "../bulkadd.png";

class Bulkadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
          employees: [{}],
        };
      }

      handleAddRow = () => {
        const item = {
          id: "",
          name: ""
        };
        this.setState({
          employees: [...this.state.employees, item]
        });
      };
      oncancel=()=>{
        this.props.history.push("/");
        document.location.reload();
      }
     
      rowRemove = (idx) => {
        const rows = [...this.state.employees]
        rows.splice(idx, 1)
        this.setState({employees: rows })
      };

      handleChange = (e,idx) => {
        const { name, value } = e.target;
      
      const updated_array=   this.state.employees.map((item,index)=>{
                  if(idx==index&&name=="id"){
                   item.id=value;
                  }
                  else if(idx==index&&name=="name")
                 {item.name=value;}
                  return item;
       })
       this.setState({employees:updated_array})
       console.log(updated_array);

        }
       
    

    render() {
        return (
            <div className="emp-content">
                <button onClick={(e)=>this.oncancel(e)}>cancel</button>
                <input type="image" src={add}  onClick={this.handleAddRow} />
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>
                               Employee id
                            </th>
                             <th>
                               Employee name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="tr">
                        {this.state.employees.map((item,index)=>(
                        <tr>
                            <td>
                                <input type="text" className='inputWidth' name ="id"  value={this.state.employees[index].id}
                          onChange={(e)=>this.handleChange(e,index)}/>
                            </td>
                            <td>
                                <span>
                                <input type="text" className='inputWidth' name="name"  value={this.state.employees[index].name}
                          onChange={(e)=>this.handleChange(e,index)}/>
                                <h7 className="removerow" onClick={(e)=>this.rowRemove(index)}>    x     </h7></span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Bulkadd;