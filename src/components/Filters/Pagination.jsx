import React from "react";
import classNames from "classnames";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({ moviesPageStore }))
@observer
class Pagination extends React.Component {
  nextPage = () => {
    this.props.moviesPageStore.onChangePagination({
      page: this.props.moviesPageStore.page + 1,
      total_pages: this.props.moviesPageStore.total_pages
    });
  };

  prevPage = () => {
    this.props.moviesPageStore.onChangePagination({
      page: this.props.moviesPageStore.page - 1,
      total_pages: this.props.moviesPageStore.total_pages
    });
  };

  render() {
    const { page, total_pages } = this.props.moviesPageStore;
    return (
      <nav className="d-flex align-items-center">
        <ul className="pagination mb-0 mr-3">
          <li
            className={classNames("page-item", {
              disabled: page === 1
            })}
          >
            <span className="page-link" onClick={this.prevPage}>
              Назад
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={this.nextPage}>
              Вперед
            </span>
          </li>
        </ul>
        <span>
          {page} of {total_pages}
        </span>
      </nav>
    );
  }
}
export default Pagination;
