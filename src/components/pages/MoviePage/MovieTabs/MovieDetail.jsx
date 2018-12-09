import React from "react";

const MovieDetail = ({ movie }) => (
  <table>
    <tbody>
      <tr>
        <th> Статус</th>
        <td>{!!movie.status ? movie.status : null}</td>
      </tr>
      <tr>
        <th> Дата выхода</th>
        <td>{!!movie.release_date ? movie.release_date : null}</td>
      </tr>
      <tr>
        <th> Продолжительность</th>
        <td>{!!movie.runtime ? movie.runtime : null} минут</td>
      </tr>
      <tr>
        <th> Язык оригинала</th>
        <td>
          {!!movie.original_language && movie.original_language.length > 0
            ? movie.original_language
            : null}
        </td>
      </tr>
      <tr>
        <th> Страна </th>
        <th>
          {!!movie.production_countries && movie.production_countries.length > 0
            ? movie.production_countries[0].name
            : null}
        </th>
      </tr>
      <tr>
        <th> Бюджет </th>
        <td>{!!movie.budget ? movie.budget : null}</td>
      </tr>

      <tr>
        <th> Сборы</th>
        <td>{!!movie.revenue ? movie.revenue : null}</td>
      </tr>
      <tr>
        <th> Жанры</th>

        <td>
          {!!movie.genres && movie.genres.length > 0
            ? movie.genres.map(genre => {
                return (
                  <React.Fragment key={genre.id}>
                    <span className="badge badge-secondary">{genre.name}</span>
                    <br />
                  </React.Fragment>
                );
              })
            : null}
        </td>
      </tr>
    </tbody>
  </table>
);
export default MovieDetail;
