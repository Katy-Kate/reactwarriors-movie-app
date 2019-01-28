import React from "react";
import { inject, observer } from "mobx-react";

@inject("moviesPageStore")
@observer
class SortBy extends React.Component {
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
    const {
      filters: { sort_by },
      onChangeFilters
    } = this.props.moviesPageStore;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          id="sort_by"
          className="form-control"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
export default SortBy;
