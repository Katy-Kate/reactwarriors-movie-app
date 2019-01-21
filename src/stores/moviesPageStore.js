import CallApi from "../api/api";
import { action, observable, configure, reaction, values } from "mobx";

configure({ enforceActions: "always" });

const defaultFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "Все фильмы",
  with_genres: []
};

class MoviesPageStore {
  constructor() {
    reaction(() => this.page, () => this.getMovies());
    reaction(
      () => values(this.filters),
      () => {
        this.onChangePage(1);
        this.getMovies();
      }
    );
  }

  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "Все фильмы",
    with_genres: []
  };

  @observable
  genres = [];

  @observable
  page = 1;

  @observable
  movies = [];

  @observable
  isLoading = false;

  @observable
  total_pages = "";

  @action
  changeLoading = booleanMeaning => {
    this.isLoading = booleanMeaning;
  };

  nextPage = () => {
    this.onChangePage(this.page + 1);
  };

  prevPage = () => {
    this.onChangePage(this.page - 1);
  };

  @action
  onChangePage = page => {
    this.page = page;
  };

  onClearFilters = () => {
    this.updateFilters(defaultFilters);
    this.onChangePage(1);
    this.resetGenres();
  };

  @action
  onChangeFilters = event => {
    this.filters[event.target.name] = event.target.value;
  };

  onChangeGenres = event => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.filters.with_genres, event.target.value]
          : this.filters.with_genres.filter(
              genre => genre !== event.target.value
            )
      }
    });
  };

  resetGenres = () => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  @action
  updateFilters = filters => {
    for (const key in filters) {
      this.filters[key] = filters[key];
    }
  };

  @action
  updateGenres = genres => {
    this.genres = genres;
  };

  @action
  updateMovies = movies => {
    this.movies = movies;
  };

  @action
  updateTotalPages = totalPages => {
    this.total_pages = totalPages;
  };

  getGenres = () => {
    CallApi.get("/genre/movie/list", { params: { language: "ru - RU" } }).then(
      data => {
        this.updateGenres(data.genres);
      }
    );
  };

  getMovies = () => {
    this.changeLoading(true);
    const { sort_by, primary_release_year, with_genres } = this.filters;
    const queryStringParams = {
      language: "ru-RU",
      sort_by,
      page: this.page,
      primary_release_year
    };

    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join(",");
    }
    CallApi.get("/discover/movie", { params: queryStringParams }).then(data => {
      this.onChangePage(data.page);
      this.updateTotalPages(data.total_pages);
      this.updateMovies(data.results);
      this.changeLoading(false);
    });
  };
}
export const moviesPageStore = new MoviesPageStore();
