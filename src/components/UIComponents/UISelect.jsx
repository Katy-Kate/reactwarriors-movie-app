import React from "react";
export default class UISelect extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Год</label>
        <select className="form-control" id="exampleFormControlSelect1">
          {/* {children} */}
        </select>
      </div>
    );
  }
}
