import React from "react";
import Genres from "./Genres";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({ moviesPageStore }))
@observer
class GenresContainer extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getGenres();
  }
  render() {
    return <Genres />;
  }
}
export default GenresContainer;
