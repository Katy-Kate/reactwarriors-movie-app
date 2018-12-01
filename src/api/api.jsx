export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY_3 = "505075685f5961155a9bfb5422604ac7";
export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDUwNzU2ODVmNTk2MTE1NWE5YmZiNTQyMjYwNGFjNyIsInN1YiI6IjViZjNlY2FmMGUwYTI2MjY2ZjA5NmQyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SYjBYTjlEfCB9KPveqgypKp-MwXIJUBtP3f1NWWwpLY";
export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};
