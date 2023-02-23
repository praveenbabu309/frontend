import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search, getFilterValue } = this.props;
    return (
      <input
        type="text"
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
