import React from "react";
import UiSelect from "../UIComponents/UISelect";

export default class PrimaryReLeaseYear extends React.Component {
  static defaultProps = {
    options: [
      {
        label: "Все фильмы",
        value: ""
      },
      {
        value: "2018",
        label: "2018"
      },
      {
        value: "2005",
        label: "2005"
      },
      {
        value: "1991",
        label: "1991"
      }
    ]
  };
  render() {
    const { options, onChangeFilters, primary_release_year } = this.props;
    return (
      <div className="form-group">
        <select
          className="form-control"
          id="primary_release_year"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(item => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
