import React from "react";
import PropTypes from "prop-types";

export default class SortBy extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };
  static defaultProps = {
    options: [
      {
        value: "popularity.desc",
        label: "Популярные по убыванию"
      },
      {
        value: "popularity.asc",
        label: "Популярные по возростанию"
      },
      {
        value: "vote_average.desc",
        label: "Рейтинг по убыванию"
      },
      {
        value: "vote_average.asc",
        label: "Рейтинг по возростанию"
      }
    ]
  };

  render() {
    console.log("options", this.props.sort_by);
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
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
