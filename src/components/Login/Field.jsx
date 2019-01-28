import React from "react";
import classNames from "classnames";

class Field extends React.PureComponent {
  render() {
    const {
      id,
      labelText,
      type,
      placeholderText,
      name,
      value,
      onChange,
      errors,
      onBlur
    } = this.props;
    console.log("render", name);
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          type={type}
          className={classNames("form-control", { invalid: errors })}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    );
  }
}
export default Field;
