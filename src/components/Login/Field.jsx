import React from "react";
import classNames from "classnames";

import { inject, observer } from "mobx-react";

@inject(({ store }) => ({
  onChange: store.onChange,
  handleBlur: store.handleBlur
}))
@observer
class Field extends React.Component {
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
      handleBlur
    } = this.props;
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
          onBlur={handleBlur}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    );
  }
}
export default Field;
