import React, { Component } from "react";

class Bulkactionmenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {value,onbulkActionMenuClick} = this.props;
    return (
      
      <select 
      className="bulk-action"
      value={value} 
      onChange={onbulkActionMenuClick
      } 
    >
      <option  hidden className="dropdown-menu">Bulk Action'</option>
     <option  className="dropdown-menu" value="add">Bulk Add</option>
      <option   className="dropdown-menu" value="edit">Bulk Edit</option>
      <option  className="dropdown-menu" value="delete">Bulk Delete</option>
    </select>
    );
  }
}

export default Bulkactionmenu;
