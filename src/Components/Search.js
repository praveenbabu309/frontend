import React, { Component } from "react";
import add from "../add.png";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search, getFilterValue } = this.props;
    return (
      <input
        type="search"
        autoFocus
        className="search"
        name="search"
        value={search}
        onChange={getFilterValue}
        placeholder="Search by Employee Id , Name"
      />
    );
  }
}

export default Search;
