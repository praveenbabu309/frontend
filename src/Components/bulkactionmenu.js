import React, { Component } from "react";

class Bulkactionmenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onhandleEdit ,onhandleAdd,onhandleDelete} = this.props;
    return (
      <div className="dropdown-menu">
        <div  className="dropdown-list" onClick={onhandleEdit}>
          Bulk Edit
        </div>
        <div className="dropdown-list"onClick={onhandleAdd}>Bulk Add</div>

        <div className="dropdown-list"onClick={onhandleDelete}>Bulk Delete</div>
      </div>
    );
  }
}

export default Bulkactionmenu;
