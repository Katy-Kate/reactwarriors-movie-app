import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable, configure, computed } from "mobx";

configure({ enforceActions: "always" });

const defaultFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "Все фильмы",
  with_genres: []
};
class Store {
  @observable
  filters = defaultFilters;

  @observable
  page = 1;

  @observable
  total_pages = "";

  @action
  onChangeFilters = event => {
    this.filters[event.target.name] = event.target.value;
  };

  @action
  onChangeGenres = ({ name, value }) => {
    this.filters[name] = value;
  };

  @action
  onChangePagination = ({ page, total_pages = this.total_pages }) => {
    this.page = page;
    this.total_pages = total_pages;
  };

  @action
  onClearFilters = () => {
    this.filters = defaultFilters;
    this.page = 1;
    this.total_pages = "";
  };
}
export const moviesPageStore = new Store();
