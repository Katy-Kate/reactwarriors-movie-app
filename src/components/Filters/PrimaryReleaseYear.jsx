import React from "react";
import UISelect from "../UIComponents/UISelect";
import { inject, observer } from "mobx-react";

@inject("moviesPageStore")
@observer
class PrimaryReLeaseYear extends React.Component {
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
    const {
      moviesPageStore: { filters },
      options
    } = this.props;
    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={filters.primary_release_year}
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
export default PrimaryReLeaseYear;
