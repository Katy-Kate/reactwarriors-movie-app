import React from "react";

const Field = props => {
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
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};
export default Field;
