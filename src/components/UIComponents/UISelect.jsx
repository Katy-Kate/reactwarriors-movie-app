import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer
class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;
    console.log("UISelect render");
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
export default UISelect;
