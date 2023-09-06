import React, { Component } from 'react';
import add from "../bulkadd.png";
import Modal from './Modal';

class Bulkadd extends Component {
    constructor(props) {
        super(props);
        this.idRefs = {};
        this.nameRefs = {};
        this.state = {
          employees: [{}],
          error:false,
          conformation:false,
          message:"",
          disabled:false,
          errorid:""
        };
      }

      handleAddRow = () => {
        this.setState({disabled:false});
        const item = {
          id: "",
          name: ""
        };
        this.setState({
          employees: [...this.state.employees, item]
        });
      };
      oncancel=()=>{
        this.props.history.push("/employees");
        document.location.reload();
      }
     
      onsave=()=>{ 
       // this.state.employees.map((emp, index)=>{
        for(let i=0;i<this.state.employees.length;i++)  {
       const Idinput = this.idRefs[i];
       const Nameinput = this.nameRefs[i];
      if (!Idinput.value) {
        Idinput.focus();
        return;
      } 
      if (!Nameinput.value) {
        Nameinput.focus();
        return;
      }  
         }
         this.setState({conformation:true,backgroupdblur: "blur"}) 
      }

      rowRemove = (idx) => {
        const rows = [...this.state.employees]
        rows.splice(idx, 1)
        if(this.state.employees.length==1){
          this.setState({disabled:true});
        }
       
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
        }
       
        hideModal = () => {
          this.setState({ conformation: false ,backgroupdblur:""});
        };

        dialogueOk=()=>{
          fetch("http://localhost:8080/api/bulkadd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.employees),
        })
          .then((res) => res.json())
          .then((res) => {
           console.log(res);
           if(res.status == "CONFLICT")
           {
            this.setState({error:true,conformation:false,message:res.message,backgroupdblur: "blur",errorid:res.id})
           }
           else{
            this.props.history.push("/employees");
            document.location.reload();
           }

          });
        }
        errorOk = () => {
          this.setState({ error: false,backgroupdblur: "" ,message:""});
          for(let i=0;i<this.state.employees.length;i++)  {
            const Idinput = this.idRefs[i];
            const Nameinput = this.nameRefs[i];
           if (this.state.errorid==Idinput.value) {
             Idinput.focus();
             return;
           }  
              }

        };

    render() {
        return (
          <div>
          <div className={this.state.backgroupdblur}>
            <div className="emp-content">
            <h2 className="textcenter"> Bulk Add</h2>
            <tr>
              <button className='bulkdelete' onClick={(e)=>this.onsave(e)} disabled={this.state.disabled}>Save</button>
                <button className='bulkdeleteCancel' onClick={(e)=>this.oncancel(e)}>cancel</button>
                <input className='bulkAddIcon' type="image" src={add}  onClick={this.handleAddRow} />
                </tr>
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
                    <tbody className="">
                        {this.state.employees.map((item,index)=>(
                        <tr>
                            <td>
                                <input type="number" className='inputWidth' name ="id" value={this.state.employees[index].id}
                          onChange={(e)=>this.handleChange(e,index)} ref={(input) => {
                            this.idRefs[index] = input;
                          }} />
                            </td>
                            <td>
                                <span>
                                <input type="text" className='inputWidth' name="name"  value={this.state.employees[index].name}
                          onChange={(e)=>this.handleChange(e,index)} ref={(input) => {
                            this.nameRefs[index] = input;
                          }}/>
                                <h7 className="removerow" onClick={(e)=>this.rowRemove(index)}>    x     </h7></span>
                            </td>
                        </tr>
                        
                        ))}


                    </tbody>
                </table>
               
            </div>
            </div>
            <Modal
            show={this.state.conformation}
            handleClose={this.hideModal}
            handleok={() => this.dialogueOk()}
            msg={this.state.message?this.state.message:"Do you want to save all"}
            cancellabel="Cancel"
            oklabel="Ok"
            dialogueHeader=" Conformation"
          />
           <Modal
          show={this.state.error}
          handleClose={this.errorOk}
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

export default Bulkadd;