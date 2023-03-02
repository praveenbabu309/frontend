import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    const{checkboxclick,id}=this.props;
    return (
      <label key={id} class="main">
        <input type="checkbox" value={id} onChange={(e)=>checkboxclick(e)} />
        <span class="geekmark"></span>
      </label>
    );
  }
}

export default Checkbox;
