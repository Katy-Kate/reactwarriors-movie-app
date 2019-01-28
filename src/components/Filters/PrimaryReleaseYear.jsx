import React from "react";
import UISelect from "../UIComponents/UISelect";

export default class PrimaryReLeaseYear extends React.Component {
  static defaultProps = {
    options: [
      {
        label: "Все фильмы",
        value: "0"
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
    const { primary_release_year, onChangeFilters, options } = this.props;

    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        htmlFor={options[0].value}
        labelText="Год релиза:"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}
