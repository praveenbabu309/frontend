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
      <option  className="dropdown-menu">Bulk Action'</option>
     <option  className="dropdown-menu" value="add">Orange</option>
      <option   className="dropdown-menu" value="edit">Radish</option>
      <option  className="dropdown-menu" value="delete">Cherry</option>
    </select>
    );
  }
}

export default Bulkactionmenu;
