import React from "react";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({ moviesPageStore }))
@observer
class UISelect extends React.Component {
  render() {
    const {
      id,
      name,
      value,
      moviesPageStore: { onChangeFilters },
      labelText,
      children
    } = this.props;

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
