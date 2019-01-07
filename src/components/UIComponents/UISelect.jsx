import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({ moviesPageStore }))
@observer
class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
      name,
      value,
      moviesPageStore: { onChangeFilters },
      labelText,
      children
    } = this.props;
    console.log("UISelect render");
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChangeFilters}
        >
          {children}
        </select>
      </div>
    );
  }
}
export default UISelect;
